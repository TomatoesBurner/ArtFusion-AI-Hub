const express = require("express");
const User = require("../models/userModels");

exports.getMe = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            user: req.user,
        },
    });
};

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
