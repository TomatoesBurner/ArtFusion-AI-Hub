const Joi = require("joi");
const { BaseNoIdDto } = require("./baseNoIdDto");

const paginationInputJoiSchemaObj = {
    cursor: Joi.string().min(1).max(255),
    limit: Joi.number().min(1).max(100),
};

const paginationInputJoiSchema = Joi.object({
    ...paginationInputJoiSchemaObj,
});

class PaginationInputDto extends BaseNoIdDto {
    constructor(data) {
        super();
        this.cursor = data?.cursor || null;
        this.limit = parseInt(data?.limit);
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
