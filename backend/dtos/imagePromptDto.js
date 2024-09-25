const Joi = require("joi");
const {
    paginationInputJoiSchemaObj,
    PaginationInputDto,
} = require("./paginationInputDto");
const BaseDto = require("./baseDto");

const getAllImagePromptsJoiSchema = Joi.object({
    ispId: Joi.string().min(2).max(255).required(),
    ...paginationInputJoiSchemaObj,
});

class GetAllImagePromptsInputDto extends PaginationInputDto {
    constructor(data) {
        super(data);
        this.ispId = data.ispId;
    }
}

class ImagePromptDto extends BaseDto {
    constructor(data) {}
}

module.exports = {
    getAllImagePromptsJoiSchema,
    GetAllImagePromptsInputDto,
    ImagePromptDto,
};
