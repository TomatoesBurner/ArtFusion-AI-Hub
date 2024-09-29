const Joi = require("joi");
const { userJoiSchema } = require("./userDto");
const BaseDto = require("./baseDto");

const userLoginJoiSchema = Joi.object({
    email: userJoiSchema.extract("email"),
    password: userJoiSchema.extract("password"),
});

class UserLoginDto extends BaseDto {
    constructor(data) {
        super(data);
        this.email = data.email;
        this.password = data.password;
    }

    static fromRequest(data) {
        return new UserLoginDto(data);
    }

    static fromModel(user) {}

    toModel() {}
}

module.exports = {
    userLoginJoiSchema,
    UserLoginDto,
};
