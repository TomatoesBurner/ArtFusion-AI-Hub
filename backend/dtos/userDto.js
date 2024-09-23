const Joi = require("joi");
const BaseDTO = require("./baseDto");

const userJoiSchema = Joi.object({
    name: Joi.string().max(50).required(),
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])"))
        .required()
        .messages({
            "string.min": "Password must be at least 8 characters long.",
            "string.pattern.base": `Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%).`,
        }),
});

class UserDto extends BaseDTO {
    /**
     *
     */
    constructor({}) {}

    fromModel(user) {}
}

module.exports = {
    userJoiSchema,
    UserDto,
};
