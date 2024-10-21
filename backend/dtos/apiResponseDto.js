const { BaseNoIdDto } = require("./baseNoIdDto");

class ApiResponseDto extends BaseNoIdDto {
    constructor(data) {
        super();
        this.data = data.data;
        this.message = data.message;
        this.error = data.error;
        this.code = data.code;
        this.status = data.status;
    }
}

module.exports = {
    ApiResponseDto,
};
