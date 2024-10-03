const BaseDto = require("./baseDto");
const jwt = require("jsonwebtoken");
const { TokenDto } = require("./tokenDto");

class UserTokensDto extends BaseDto {
    constructor(data) {
        super(data);
        const { userId, accessToken, refreshToken, refreshTokenExpirsAt } =
            data;
        const accessTokenPayload = jwt.decode(accessToken);
        this.userId = userId;
        this.accessToken = accessTokenPayload
            ? new TokenDto({
                  token: accessToken,
                  expiresAt: new Date(accessTokenPayload.exp * 1000),
              })
            : null;
        this.refreshToken = new TokenDto({
            token: refreshToken,
            expiresAt: refreshTokenExpirsAt,
        });
    }
}

module.exports = {
    UserTokensDto,
};
