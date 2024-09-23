const BaseDto = require("./baseDto");
const jwt = require("jsonwebtoken");
const { TokenDto } = require("./tokenDto");

class UserMeDto extends BaseDto {
    constructor(data) {
        super(data);
        const { userId, accessToken, refreshToken, refreshTokenExpirsAt } =
            data;
        const accessTokenPayload = jwt.decode(accessToken);
        this.userId = userId;
        this.accessToken = new TokenDto({
            token: accessToken,
            expiresAt: new Date(accessTokenPayload * 1000),
        });
        this.refreshToken = new TokenDto({
            token: refreshToken,
            expiresAt: refreshTokenExpirsAt,
        });
    }
}

module.exports = {
    UserMeDto,
};
