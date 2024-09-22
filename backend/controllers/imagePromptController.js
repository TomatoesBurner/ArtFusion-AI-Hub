import ImagePrompt from "../models/imagePrompt.js";

const getAllImagePrompts = async (req, res) => {
    const { promptSpaceId } = req.params;
    const { cursor = null, limit = 10 } = req.query;

    console.log("promptSpaceId", promptSpaceId);
    console.log("cursor", cursor);
    console.log("limit", limit);
};

const controller = {
    getAllImagePrompts,
};

module.export = controller;
