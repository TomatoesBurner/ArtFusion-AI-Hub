const Joi = require("joi");
const { userJoiSchema } = require("./userDto");
const BaseDto = require("./baseDto");
const { AUTH_METHOD_VALUES } = require("../types/authMethodTypes");

const oAuthLoginJoiSchema = Joi.object({
    // accessToken: Joi.string().required(),
    googleAuthCode: Joi.string(),
    provider: Joi.string()
        .valid(...AUTH_METHOD_VALUES)
        .required(),
});

class OAuthLoginDto extends BaseDto {
    constructor(data) {
        super(data);
        this.googleAuthCode = data.googleAuthCode;
        this.provider = data.provider;
    }

    static fromRequest(data) {
        return new OAuthLoginDto(data);
    }
}

module.exports = {
    oAuthLoginJoiSchema,
    OAuthLoginDto,
};
