const Joi = require("joi");
const { BaseNoIdDto } = require("./baseNoIdDto");

const imagePromptCreateJoiSchema = Joi.object({
    width: Joi.number().multiple(8).min(20).max(1920).required(),
    height: Joi.number().multiple(8).min(20).max(1080).required(),
    dpi: Joi.number().required(),
    aspectRatio: Joi.string()
        .pattern(/^[0-9]+:[0-9]+$/)
        .required(),
    message: Joi.string().min(10).max(255).required(),
    model: Joi.string().min(2).max(255).required(),
});

class ImagePromptCreateDto extends BaseNoIdDto {
    constructor(data) {
        super();
        this.width = data.width;
        this.height = data.height;
        this.dpi = data.dpi;
        this.aspectRatio = data.aspectRatio;
        this.message = data.message;
        this.model = data.model;
    }

    static fromRequest(data) {
        return new ImagePromptCreateDto(data);
    }
}

module.exports = {
    imagePromptCreateJoiSchema,
    ImagePromptCreateDto,
};
