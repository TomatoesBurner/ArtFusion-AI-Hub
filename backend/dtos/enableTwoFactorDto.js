const { BaseNoIdDto } = require("./baseNoIdDto");

class EnableTwoFactorDto extends BaseNoIdDto {
    constructor(data) {
        super();
        this.verifyId = data.verifyId;
        this.secret = data.secret;
        this.totpAuthUrl = data.totpAuthUrl;
        this.expiresAt = data.expiresAt;
    }
}

module.exports = {
    EnableTwoFactorDto,
};
