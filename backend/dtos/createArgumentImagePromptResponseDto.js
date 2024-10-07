const Joi = require("joi");
const { IMAGE_EXTENSION_VALUES } = require("../types/imageExtensionTypes");
const { BaseNoIdDto } = require("./baseNoIdDto");

const createArgumentImagePromptResponseJoiSchema = Joi.object({
    filters: Joi.string().required(),
    extension: Joi.string()
        .valid(...IMAGE_EXTENSION_VALUES)
        .required(),
});

class CreateArgumentImagePromptResponseDto extends BaseNoIdDto {
    constructor(data) {
        super(data);
        this.filters = data.filters;
        this.extension = data.extension;
    }

    static fromRequest(data) {
        return new CreateArgumentImagePromptResponseDto(data);
    }
}

module.exports = {
    createArgumentImagePromptResponseJoiSchema,
    CreateArgumentImagePromptResponseDto,
};
