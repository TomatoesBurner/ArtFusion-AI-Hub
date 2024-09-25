class PaginationResponse extends BaseNoIdDto {
    constructor(data) {
        this.cursor = data.cursor;
        this.limit = data.limit;
        this.hasNext = data.hasNext;
    }
}

module.exports = {
    PaginationResponse,
};
