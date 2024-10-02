const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const sendEmail = require("./../utils/email");
const authService = require("../services/authService");
const { UserLoginDto } = require("../dtos/userLoginDto");
const { UserRegisterDto } = require("../dtos/userRegisterDto");
const { TokenRefreshInputDto } = require("../dtos/tokenRefreshInputDto");
const { OAuthLoginDto } = require("../dtos/oAuthLoginDto");
const { API_RESPONSE_CODE } = require("../utils/constant");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

//signup
exports.signup = catchAsync(async (req, res, next) => {
    const ipAddress = req.ip;
    const userAgent = req.get("User-Agent");
    const { data, error } = await authService.register({
        input: UserRegisterDto.fromRequest(req.body),
        ipAddress,
        userAgent,
    });

    if (error) {
        return next(error);
    }

    res.status(200).json({
        data: data,
    });
});

//login
exports.login = catchAsync(async (req, res, next) => {
    const ipAddress = req.ip;
    const userAgent = req.get("User-Agent");
    const { data, error } = await authService.login({
        input: UserLoginDto.fromRequest(req.body),
        ipAddress,
        userAgent,
    });

    if (error) {
        return next(error);
    }

    res.status(200).json({
        data: data,
    });
});

// token refresh
exports.tokenRefresh = catchAsync(async (req, res, next) => {
    const ipAddress = req.ip;
    const userAgent = req.get("User-Agent");
    const { data, error } = await authService.refreshUserToken({
        data: new TokenRefreshInputDto(req.body),
        ipAddress,
        userAgent,
    });

    if (error) {
        return next(
            new AppError(error, 401, API_RESPONSE_CODE.invalidRefreshToken)
        );
    }

    res.status(200).json({
        data: data,
    });
});

//logout
exports.logout = catchAsync(async (req, res, next) => {
    const token = req.params.token;

    if (!token) {
        return next(new AppError("No token provided", 400));
    }

    const userId = req.user._id;

    const { error } = await authService.logout({
        data: {
            userId,
            refreshToken: token,
        },
    });

    if (error) {
        return next(error);
    }

    res.status(200).json({ status: "success", message: "Logged out" });
});

// OAuth login
exports.oAuthLogin = catchAsync(async (req, res, next) => {
    const { data, error } = await authService.oAuthLogin({
        input: new OAuthLoginDto(req.body),
        ipAddress: req.ip,
        userAgent: req.get("User-Agent"),
    });

    if (error) {
        return next(error);
    }

    res.status(200).json({
        data: data,
    });
});

/**
 * Middleware to protect routes and ensure the user is authenticated.
 * This function verifies the JWT token, checks if the user still exists,
 * and ensures that the user has not changed their password after the token was issued.
 * If all checks pass, the user is allowed access to the protected route.
 */
exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(
            new AppError(
                "You are not logged in! Please log in to get access.",
                401
            )
        );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist.",
                401
            )
        );
    }
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                "User recently changed password! Please log in again!"
            ),
            401
        );
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});

//forgotPassword
exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError("There is no user with email address.", 404));
    }
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://your-frontend-domain.com/reset-password?token=${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Your password reset token (valid for 10 min)",
            message,
        });
        res.status(200).json({
            status: "success",
            message: "Token sent to email!",
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(
            new AppError(
                "There was an error sending the email. Try again later!"
            ),
            500
        );
    }
});

//resetPassword
exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new AppError("Token is invalid or has expired", 400));
    }
    user.password = req.body.password;
    // user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    // 4) Log the user in, sent JWT
    const token = signToken(user._id);
    res.status(200).json({
        status: "success",
        token,
    });
});

//updatePassword
exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select("+password");

    // 2) Check if POSTed current password is correct
    if (
        !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
        return next(new AppError("Your current password is wrong.", 401));
    }
    // 3) If so, update password
    user.password = req.body.password;
    // user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // 4) Log user in, send JWT
    createSendToken(user, 200, req, res);
});
