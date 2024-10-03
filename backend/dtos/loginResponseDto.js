const { UserTokensDto } = require("./userTokensDto");

class LoginResponseDto extends UserTokensDto {
    constructor(data) {
        super(data);
        this.verifyId = data.verifyId;
    }
}

module.exports = {
    LoginResponseDto,
};
