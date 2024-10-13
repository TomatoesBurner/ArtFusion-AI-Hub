const catchAsync = require("../utils/catchAsync");
const authService = require("../services/authService");

exports.getMe = catchAsync(async (req, res, next) => {
    const { data, error } = await authService.userMe({
        userId: req.user._id,
    });

    if (error) {
        return next(error);
    }

    res.status(200).json({
        data: data,
    });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { firstName, lastName, themeMode } = req.body;

    const { data, error } = await authService.updateUserProfile({
        userId,
        firstName,
        lastName,
        themeMode,
    });

    if (error) {
        return next(new AppError(error.message, 400));
    }

    res.status(200).json({
        status: "success",
        data,
    });
});
