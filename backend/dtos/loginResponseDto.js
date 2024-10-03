const { UserTokensDto } = require("./userTokensDto");

class LoginResponseDto extends UserTokensDto {
    constructor(data) {
        super({});
        this.userId = data.userId;
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.verifyId = data.verifyId;
    }
}

module.exports = {
    LoginResponseDto,
};
