const { BaseNoIdDto } = require("./baseNoIdDto");

class BaseDto extends BaseNoIdDto {
    constructor(data) {
        super();
        if (data) {
            this.id = data._id;
        }
    }

    static fromRequest(data) {}

    static fromModel(data) {}

    toModel() {
        return {
            _id: this.id,
        };
    }
}

module.exports = BaseDto;
