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
    const { name, firstName, lastName, themeMode } = req.body;

    const { data, error } = await authService.updateUserProfile({
        userId,
        name,
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

exports.isUserNameDuplicate = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { name } = req.body;

    // 调用 service 检查用户名是否重复
    const isDuplicate = await authService.isUserNameDuplicate(userId, name);

    if (isDuplicate) {
        return next(new AppError("Name already in use by another user", 400));
    }

    res.status(200).json({
        status: "success",
        message: "Name is available",
    });
});
