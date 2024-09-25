const Joi = require("joi");
const {
    paginationInputJoiSchemaObj,
    PaginationInputDto,
} = require("./paginationInputDto");
const BaseDto = require("./baseDto");
const { ImagePromptResponseDto } = require("./ImagepromptResponseDto");
const {
    ArgumentImagePromptResponseDto,
} = require("./argumentImagePromptResponseDto");

const getAllImagePromptsJoiSchema = Joi.object({
    ...paginationInputJoiSchemaObj,
});

class GetAllImagePromptsInputDto extends PaginationInputDto {
    constructor(data) {
        super(data);
        this.ipsId = data.ipsId;
    }

    static fromRequest(data) {
        return new GetAllImagePromptsInputDto(data);
    }
}

class ImagePromptDto extends BaseDto {
    constructor(data) {
        super(data);
        this.input = {
            filters: {
                width: data.input.filters.width,
                height: data.input.filters.height,
                aspectRatio: data.input.filters.aspectRatio,
                dpi: data.input.filters.dpi,
            },
            message: data.input.message,
            fullMessage: data.input.fullMessage,
            model: data.input.model,
        };
        this.response = new ImagePromptResponseDto(data.response);
        this.argumentResponses = [];
        if (data.argumentResponses) {
            data.argumentResponses.forEach((response) => {
                this.argumentResponses.push(
                    new ArgumentImagePromptResponseDto(response)
                );
            });
        }
    }

    static fromModel(data) {
        return new ImagePromptDto(data);
    }

    static fromRequest(data) {
        return new ImagePromptDto(data);
    }
}

module.exports = {
    getAllImagePromptsJoiSchema,
    GetAllImagePromptsInputDto,
    ImagePromptDto,
};
