const { BaseNoIdDto } = require("./baseNoIdDto");

class VerifyTwoFactorDto extends BaseNoIdDto {
    constructor(data) {
        super();
        this.verifyId = data.verifyId;
        this.token = data.token;
    }
}

module.exports = {
    VerifyTwoFactorDto,
};
