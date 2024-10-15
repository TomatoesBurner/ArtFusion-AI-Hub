const Joi = require("joi");
const { VIDEO_EXTENSION_VALUES } = require("../types/videoExtensionTypes");
const { BaseNoIdDto } = require("./baseNoIdDto");

const createArgumentVideoPromptResponseJoiSchema = Joi.object({
    filters: Joi.string().required(),
    extension: Joi.string()
        .valid(...VIDEO_EXTENSION_VALUES)
        .required(),
});

class CreateArgumentVideoPromptResponseDto extends BaseNoIdDto {
    constructor(data) {
        super(data);
        this.filters = data.filters;
        this.extension = data.extension;
    }

    static fromRequest(data) {
        return new CreateArgumentVideoPromptResponseDto(data);
    }
}

module.exports = {
    createArgumentVideoPromptResponseJoiSchema,
    CreateArgumentVideoPromptResponseDto,
};
