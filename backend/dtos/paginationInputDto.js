class PaginationInputDto extends BaseNoIdDto {
    constructor(data) {
        this.cursor = data.cursor;
        this.limit = data.limit;
    }

    static fromRequest(data) {
        return new PaginationInputDto(data);
    }
}
