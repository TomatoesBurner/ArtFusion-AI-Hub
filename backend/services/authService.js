const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../models/userModels");
const { PROMPT_SPACE_TYPE } = require("../types/promptSpaceTypes");
const { UserMeDto } = require("../dtos/userMeDto");
const { REFRESH_TOKEN_EXPIRES_IN, APP_NAME } = require("../utils/constant");
const PromptSpace = require("../models/promptSpaceModel");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
const UserSession = require("../models/userSessionModel");
const { UserTokensDto } = require("../dtos/userTokensDto");
const { OAuth2Client } = require("google-auth-library");
const { AUTH_METHOD } = require("../types/authMethodTypes");
const { UserRegisterDto } = require("../dtos/userRegisterDto");
const { generateUsername } = require("unique-username-generator");
const { default: axios } = require("axios");

const googleAuthClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    // "http://localhost:3000"
    process.env.CLIENT_APP_URL
);

/**
 * Generates a random password of length 20 bytes.
 *
 * @returns {string} The generated password
 */
const _generateRandomPassword = () => {
    return crypto.randomBytes(20).toString("hex");
};

/**
 * Creates a JSON Web Token for the user specified in the `user` parameter.
 * The generated token is signed with the secret key specified in the
 * `JWT_SECRET` environment variable and has an expiration time specified in
 * the `JWT_EXPIRES_IN` environment variable.
 *
 * Payload will contain basic user information, including user id, name, first
 * name and other default JWT payloads.
 *
 * @param {Object} user - The user object to generate the token for.
 * @param {string} user._id - The user id
 * @param {string} user.name - The user name
 * @param {string} user.email - The user email
 * @param {string} user.firstName - The user first name
 * @param {string} user.lastName - The user last name
 *
 * @returns {string} The generated token
 */
const _signToken = (user) => {
    return jwt.sign(
        {
            sub: user._id,
            iss: APP_NAME,
            id: user._id,
            name: user.name,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
};

/**
 * Generate a pair of the required tokens for the user. This includes an access
 * token and a refresh token.
 *
 * User requires some data for creating access tokens
 *
 * @param {Object} user - The user object to generate the token pair for.
 * @param {string} user._id - The user id
 * @param {string} user.name - The user name
 * @param {string} user.email - The user email
 * @param {string} user.firstName - The user first name
 * @param {string} user.lastName - The user last name
 *
 * @returns {Promise<{ data: UserTokensDto }>} The
 * generated token pair or an AppError
 */
const _generateTokenPair = async ({ user, ipAddress, userAgent }) => {
    const accessToken = _signToken(user);
    // TODO: Can add session limit if need later
    const userSession = await _createSession({
        userId: user._id,
        ipAddress,
        userAgent,
    });

    return {
        data: new UserTokensDto({
            accessToken: accessToken,
            refreshToken: userSession.refreshToken,
            refreshTokenExpirsAt: userSession.expiresAt,
        }),
    };
};

/**
 * Generates a new random refresh token.
 *
 * The token is a sha256 hash of a random UUID that is 64 bytes long it seems.
 *
 * @returns {string} The generated token
 */
const _createNewRefreshToken = () => {
    return crypto
        .createHash("sha256")
        .update(crypto.randomUUID())
        .digest("hex");
};

/**
 * Crates two prompt psaces for the user specified in the `user` parameter.
 *
 * @param {{ userId: string, firstName: string, lastName: string }} user - The
 * input user to create prompt space for
 * @param {mongoose.Session} session - The mongoose session
 * @returns {Promise<{ imagePromptSpace: PromptSpace, videoPromptSpace: PromptSpace }>} The created prompt spaces
 */
const _createInitialPromptSpaceForuser = async (user, session) => {
    const { userId, firstName, lastName } = user;

    // User gets two initial prompt spaces one for image and one for vidoe
    const promptSpaces = await PromptSpace.create(
        [
            {
                name: `${firstName} ${lastName}'s Image Prompt Space`,
                description: `${firstName} ${lastName}'s Image Prompt Space`,
                type: PROMPT_SPACE_TYPE.Image,
                users: [userId],
                createdBy: userId,
            },
            {
                name: `${firstName} ${lastName}'s Video Prompt Space`,
                description: `${firstName} ${lastName}'s Video Prompt Space`,
                type: PROMPT_SPACE_TYPE.Video,
                users: [userId],
                createdBy: userId,
            },
        ],
        { session }
    );

    return {
        imagePromptSpace: promptSpaces[0],
        videoPromptSpace: promptSpaces[1],
    };
};

/**
 * Creates a new user session.
 *
 * @param {{ userId: string, ipAddress: string, userAgent: string }} param
 * @param {mongoose.Session} session - The mongoose session
 * @returns {Promise<UserSession>} The created user session
 */
const _createSession = async ({ userId, ipAddress, userAgent }, session) => {
    // It seems that sha256 is 64 byte that is used for now
    const newRefreshToken = _createNewRefreshToken();
    // Default expire is put in constants of 7 days in seconds
    const expiresIn =
        Number(process.env.REFRESH_TOKEN_EXPIRES_IN) ||
        REFRESH_TOKEN_EXPIRES_IN;
    const userSession = new UserSession({
        userId,
        ipAddress,
        userAgent,
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + expiresIn * 1000),
    });

    await userSession.save({ session });

    return userSession;
};

/**
 * Registers a new user with the given data, ipAddress and userAgent.
 *
 * Also creates two spaces for the user, one for video and one for image.
 *
 * @param {{ input: UserRegisterDto, ipAddress: string, userAgent: string }} param
 * @returns {Promise<{ input: UserTokensDto } | { error: AppError}>}
 */
const register = async ({
    input,
    ipAddress,
    userAgent,
    provider = AUTH_METHOD.EMAIL,
}) => {
    const { name, email, firstName, lastName, password } = input;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
        return {
            error: new AppError("Email already registered.", 400),
        };
    }

    const foundSameUserName = await User.findOne({ name });

    if (foundSameUserName) {
        return {
            error: new AppError("Name already registered.", 400),
        };
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newUser = User({
            name,
            firstName,
            lastName,
            email,
            password,
            registerMethod: provider,
            lastLoginAt: new Date(),
        });
        await newUser.save({ session });

        await _createInitialPromptSpaceForuser(
            {
                userId: newUser._id,
            },
            session
        );

        const accessToken = _signToken(newUser);

        const userSession = await _createSession(
            {
                userId: newUser._id,
                ipAddress,
                userAgent,
            },
            session
        );

        await session.commitTransaction();
        session.endSession();

        return {
            data: new UserTokensDto({
                accessToken: accessToken,
                refreshToken: userSession.refreshToken,
                refreshTokenExpirsAt: userSession.expiresAt,
            }),
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);

        throw new Error(error);
        // return { error: new AppError("Something went wrong.", 500) };
    }
};

/**
 * Logs in a user with the given email and password.
 *
 * @param {{ input: { email: string, password: string }, ipAddress: string, userAgent: string }} param
 * @returns {Promise<{ error: AppError } | { input: UserTokensDto }>} The login result
 */
const login = async ({ input, ipAddress, userAgent }) => {
    const { email, password } = input;

    const foundUser = await User.findOne({ email }).select("+password");

    if (
        !foundUser ||
        !(await foundUser.correctPassword(password, foundUser.password))
    ) {
        return {
            error: new AppError("Invalid credentials", 400),
        };
    }

    foundUser.lastLoginAt = Date.now();

    await foundUser.save();

    return await _generateTokenPair({
        user: foundUser,
        ipAddress,
        userAgent,
    });
};

/**
 * Refreshes the access token for the user specified in the `data` parameter.
 * Verifies the refresh token and then creates a new one and updates the user
 * session. Returns a new `UserTokensDto` with the new access token and
 * refresh token.
 *
 * @param {{ data: { accessToken: string, refreshToken: string }, ipAddress: string, userAgent: string }} param
 * @returns {Promise<{ data: UserTokensDto } | { error: AppError }>} The refreshed tokens or an AppError
 */
const refreshUserToken = async ({ data, ipAddress, userAgent }) => {
    const { accessToken, refreshToken } = data;
    const now = Date.now();

    const payload = jwt.decode(accessToken);

    if (!payload) {
        return {
            error: new AppError("Invalid access token", 400),
        };
    }

    const userId = payload.sub;

    const foundUser = await User.findById(userId);

    if (!foundUser) {
        return {
            error: new AppError("User not found", 400),
        };
    }

    const userSession = await UserSession.findOne({
        userId,
        refreshToken,
        expiresAt: { $gt: now },
    });

    if (!userSession) {
        return {
            error: new AppError("Invalid refresh token", 401),
        };
    }

    const newAccessToken = _signToken(foundUser);
    const expiresAt =
        Number(process.env.REFRESH_TOKEN_EXPIRES_IN) ||
        REFRESH_TOKEN_EXPIRES_IN;
    userSession.refreshToken = _createNewRefreshToken();
    userSession.expiresAt = new Date(now + expiresAt * 1000);
    userSession.ipAddress = ipAddress;
    userSession.userAgent = userAgent;

    await userSession.save();

    return {
        data: new UserTokensDto({
            accessToken: newAccessToken,
            refreshToken: userSession.refreshToken,
            refreshTokenExpirsAt: userSession.expiresAt,
        }),
    };
};

/**
 * Logs out a user by invalidating the given access and refresh tokens.
 *
 * This will set the found userSerssion's expiresAt to the current time
 *
 *
 * @param {{ userId: string, refreshToken: string }} data
 * @returns {Promise<{ error: AppError } | {}}}
 */
const logout = async ({ data }) => {
    const { userId, refreshToken } = data;
    const now = Date.now();

    const userSession = await UserSession.findOne({
        userId,
        refreshToken,
        expiresAt: { $gt: now },
    });

    if (!userSession) {
        return {
            error: new AppError("Invalid refresh token", 401),
        };
    }

    userSession.expiresAt = new Date(now);
    await userSession.save();

    return {};
};

/**
 * Will login user throug the providered oAuth credentials.
 * Expected to have accessToken and a provider.
 *
 * New user is created if not exists with random password hashed and a random
 * user name based on the name of the user from the provider.
 *
 * If user exists then will create app credentials for the user and return it.
 *
 * @param {{ accessToken: string, provider: AUTH_METHOD }} input
 * @param {string} ipAddress The IP address of the request
 * @param {string} userAgent The user agent of the request
 * @returns {Promise<{ input: UserTokensDto } | { error: AppError}>}
 */
const oAuthLogin = async ({ input, ipAddress, userAgent }) => {
    const { provider } = input;

    const user = new User();

    if (provider == AUTH_METHOD.GOOGLE) {
        try {
            const code = input.googleAuthCode;

            if (!code) {
                throw new Error("Invalid google code");
            }

            const { tokens } = await googleAuthClient.getToken(code);

            const payload = jwt.decode(tokens.id_token);
            const userid = payload["sub"];
            user.name = generateUsername("", 3, 12, payload["name"] || "");
            user.email = payload["email"];
            user.firstName = payload["given_name"];
            user.lastName = payload["family_name"];
            user.password = _generateRandomPassword();
        } catch (error) {
            throw new Error("Failed to authenticate with google");
        }
    } else if (provider == AUTH_METHOD.FACEBOOK) {
        throw new Error("Not supported");
    } else {
        throw new Error("Not supported");
    }

    const foundUser = await User.findOne({ email: user.email });

    if (!foundUser) {
        return await register({
            input: UserRegisterDto.fromModel(user),
            ipAddress: ipAddress,
            userAgent: userAgent,
            provider: AUTH_METHOD.GOOGLE,
        });
    }

    foundUser.lastLoginAt = Date.now();

    await foundUser.save();

    return await _generateTokenPair({
        user: foundUser,
        ipAddress,
        userAgent,
    });
};

const userMe = async ({ userId }) => {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
        return {
            error: new AppError("User not found", 400),
        };
    }

    const ips = await PromptSpace.findOne({
        createdBy: userId,
        type: PROMPT_SPACE_TYPE.Image,
    });

    const vps = await PromptSpace.findOne({
        createdBy: userId,
        type: PROMPT_SPACE_TYPE.Video,
    });

    const userMeDto = new UserMeDto({
        ...foundUser._doc,
        userId: foundUser._id,
        imagePromptSpaceId: ips?._id,
        videoPromptSpaceId: vps?._id,
    });

    return {
        data: userMeDto,
    };
};

module.exports = {
    register,
    login,
    refreshUserToken,
    logout,
    oAuthLogin,
    userMe,
};