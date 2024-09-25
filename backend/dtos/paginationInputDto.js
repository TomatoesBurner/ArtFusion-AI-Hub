const Joi = require("joi");

const paginationInputJoiSchemaObj = {
    cursor: Joi.string().required(),
    limit: Joi.number().min(1).max(100).required(),
};

const paginationInputJoiSchema = Joi.object({
    ...paginationInputJoiSchemaObj,
});

class PaginationInputDto extends BaseNoIdDto {
    constructor(data) {
        this.cursor = data.cursor;
        this.limit = data.limit;
    }

    static fromRequest(data) {
        return new PaginationInputDto(data);
    }
}

module.exports = {
    paginationInputJoiSchemaObj,
    paginationInputJoiSchema,
    PaginationInputDto,
};
