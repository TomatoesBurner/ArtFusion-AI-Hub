const Joi = require("joi");
const { BaseNoIdDto } = require("./baseNoIdDto");

const verifyTwoFactorJoiSchema = Joi.object({
    verifyId: Joi.string().required(),
    token: Joi.string().length(6).required(),
});

class VerifyTwoFactorDto extends BaseNoIdDto {
    constructor(data) {
        super();
        this.verifyId = data.verifyId;
        this.token = data.token;
    }
}

module.exports = {
    VerifyTwoFactorDto,
    verifyTwoFactorJoiSchema,
};
