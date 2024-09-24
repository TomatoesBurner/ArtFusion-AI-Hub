const Joi = require("joi");
const BaseDto = require("./baseDto");

// Retrieved below regex from ChatGPT
// Date: 23/09/2024
const userJoiSchema = Joi.object({
    name: Joi.string().min(3).max(50).pattern(/^\S*$/).required().messages({
        "string.pattern.base": '"name" must not contain spaces',
    }),
    firstName: Joi.string()
        .min(2)
        .max(50)
        .pattern(/^\S*$/)
        .required()
        .messages({
            "string.pattern.base": '"firstName" must not contain spaces',
        }),
    lastName: Joi.string().min(2).max(50).pattern(/^\S*$/).required().messages({
        "string.pattern.base": '"lastName" must not contain spaces',
    }),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(/^\S*$/)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])"))
        .required()
        .messages({
            "string.pattern.base": `"Password" must include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%).`,
        }),
});

class UserDto extends BaseDto {
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
