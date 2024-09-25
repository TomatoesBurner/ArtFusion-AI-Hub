class BaseDto extends BaseNoIdDto {
    constructor(data) {
        if (data) {
            this.Id = data._id;
        }
    }

    static fromRequest(data) {}

    static fromModel(data) {}

    toModel() {
        return {
            _id: this.Id,
        };
    }
}

module.exports = BaseDto;
