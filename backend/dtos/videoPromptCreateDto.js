const Joi = require("joi");
const { BaseNoIdDto } = require("./baseNoIdDto");

const videoPromptCreateJoiSchema = Joi.object({
    message: Joi.string().min(10).max(255).required(),
    samplingSteps: Joi.number().min(1).max(60).required(),
    cfgScale: Joi.number().min(1.0).max(30.0).required(),
    eta: Joi.number().min(0.0).max(1.0).required(),
    fps: Joi.number().min(4).max(32).required(),
    width: Joi.number().min(100).max(1920).required(),
    height: Joi.number().min(100).max(1080).required(),
    model: Joi.string().min(2).max(255).required(),
});

class VideoPromptCreateDto extends BaseNoIdDto {
    constructor(data) {
        super();
        this.message = data.message;
        this.samplingSteps = data.samplingSteps;
        this.cfgScale = data.cfgScale;
        this.eta = data.eta;
        this.fps = data.fps;
        this.width = data.width;
        this.height = data.height;
        this.videoUrl = data.videoUrl || ""; // Ensure the response processing correctly handles the 'video_url' field returned by the API
        this.model = data.model;
    }

    static fromRequest(data) {
        return new VideoPromptCreateDto(data);
    }
}

module.exports = {
    videoPromptCreateJoiSchema,
    VideoPromptCreateDto,
};
