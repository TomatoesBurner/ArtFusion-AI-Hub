const { BaseNoIdDto } = require("./baseNoIdDto");

class PaginationResponseDto extends BaseNoIdDto {
    constructor(data) {
        super();
        this.cursor = data.cursor;
        this.limit = data.limit;
        this.hasNext = data.hasNext;
    }
}

module.exports = {
    PaginationResponseDto,
};
