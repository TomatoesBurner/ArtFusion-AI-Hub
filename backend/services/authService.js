const { jwt } = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../models/userModels");
const { PROMPT_SPACE_TYPE } = require("../types/promptSpaceTypes");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const _createInitialPromptSpaceForuser = async (user) => {
    const imagePromptSpace = await PromptSpace.create({
        name: `${firstName} ${lastName}'s Image Prompt Space`,
        description: `${firstName} ${lastName}'s Image Prompt Space`,
        type: PROMPT_SPACE_TYPE.Image,
        users: [newUser._id],
        createdBy: newUser._id,
    });

    const videoPromptSoace = await PromptSpace.create({
        name: `${firstName} ${lastName}'s Video Prompt Space`,
        description: `${firstName} ${lastName}'s Video Prompt Space`,
        type: PROMPT_SPACE_TYPE.Video,
        users: [newUser._id],
        createdBy: newUser._id,
    });

    return {
        imagePromptSpace,
        videoPromptSpace,
    };
};

const register = async (param) => {
    const { name, email, firstName, lastName, password } = param;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
        return {
            error: new AppError("Email already registered.", 400),
        };
    }

    const newUser = await User.create({
        name,
        firstName,
        lastName,
        email,
        password,
    });

    const promptSpaces = await _createInitialPromptSpaceForuser(newUser);

    return {
        data: {
            user: newUser,
        },
    };
};

module.exports = {
    register,
};
