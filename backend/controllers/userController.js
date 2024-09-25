const express = require("express");
const User = require("../models/userModels");
const catchAsync = require("../utils/catchAsync");
const authService = require("../services/authService");

// exports.getMe = (req, res) => {
//     res.status(200).json({
//         status: "success",
//         data: {
//             user: req.user,
//         },
//     });
// };

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

exports.getAllUsers = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!",
    });
};

exports.getUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!",
    });
};
exports.createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!",
    });
};
exports.updateUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!",
    });
};
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!",
    });
};
