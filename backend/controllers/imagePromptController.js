import ImagePrompt from "../models/imagePrompt.js";

const getAllImagePrompts = async (req, res) => {
    const { promptSpaceId } = req.params;
    const { cursor = null, limit = 10 } = req.query;
};

const controller = {};

export default controller;
