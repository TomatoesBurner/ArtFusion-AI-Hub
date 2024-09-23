const Joi = require("joi");
const BaseDto = require("./baseDto");

const tokenRefreshJoiSchema = Joi.object({
    accessToken: Joi.string().required(),
    refreshToken: Joi.string().required(),
});

class TokenRefreshInputDto extends BaseDto {
    /**
     *
     */
    constructor(data) {
        super(data);
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
    }

    static fromRequest(data) {
        return new TokenRefreshInputDto(data);
    }
}

module.exports = {
    tokenRefreshJoiSchema,
    TokenRefreshInputDto,
};
