const Joi = require("joi");
const {
    paginationInputJoiSchemaObj,
    PaginationInputDto,
} = require("./paginationInputDto");
const BaseDto = require("./baseDto");
const { VideoPromptResponseDto } = require("./videoPromptResponseDto");

const getAllVideoPromptsJoiSchema = Joi.object({
    ...paginationInputJoiSchemaObj,
});

class GetAllVideoPromptsInputDto extends PaginationInputDto {
    constructor(data) {
        super(data);
        this.ipsId = data.ipsId;
    }

    static fromRequest(data) {
        return new GetAllVideoPromptsInputDto(data);
    }
}

class VideoPromptDto extends BaseDto {
    constructor(data) {
        super(data);
        this.input = {
            message: data.input.message,
            fullMessage: data.input.fullMessage,
            samplingSteps: data.input.samplingSteps,
            cfgScale: data.input.cfgScale,
            eta: data.input.eta,
            fps: data.input.fps,
        };
        this.response = new VideoPromptResponseDto(data.response);
    }

    static fromModel(data) {
        return new VideoPromptDto(data);
    }

    static fromRequest(data) {
        return new VideoPromptDto(data);
    }
}

module.exports = {
    getAllVideoPromptsJoiSchema,
    GetAllVideoPromptsInputDto,
    VideoPromptDto,
};
