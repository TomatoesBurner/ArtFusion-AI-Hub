class BaseDto {
    static fromModel(data) {
        this.id = data._id;
    }

    toModel() {
        return {};
    }
}

module.exports = BaseDto;
