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
    const newRefreshToken = crypto
        .createHash("sha256")
        .update(crypto.randomUUID())
        .digest("hex");
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
 * Registers a new user to the application. This will create a new user object
 * in the database and also create 2 new spaces for the user. One for video and
 * one for video.
 *
 * @param {Object} param - Input parameters
 * @param {string} param.name - The username
 * @param {string} param.email - The email
 * @param {string} param.firstName - The first name
 * @param {string} param.lastName - The last name
 * @param {string} param.password - The password
 * @param {string} param.ipAddress - The IP address
 * @param {string} param.userAgent - The user agent
 *
 * @returns {Promise<Object>|Promise<AppError>}
 */
const register = async (param) => {
    const { name, email, firstName, lastName, password, ipAddress, userAgent } =
        param;

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
            data: new UserMeDto({
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

module.exports = {
    register,
};
