const Joi = require("joi");
const { userJoiSchema } = require("./userDto");
const BaseDto = require("./baseDto");
const { AUTH_METHOD_VALUES } = require("../types/authMethodTypes");

const oAuthLoginJoiSchema = Joi.object({
    accesToken: Joi.string().required(),
    provider: Joi.string()
        .valid(...AUTH_METHOD_VALUES)
        .required(),
});

class OAuthLoginDto extends BaseDto {
    constructor({ accesToken, provider }) {
        super();
        this.accesToken = accesToken;
        this.provider = provider;
    }

    static fromRequest(data) {
        return new OAuthLoginDto(data);
    }
}

module.exports = {
    oAuthLoginJoiSchema,
    OAuthLoginDto,
};
