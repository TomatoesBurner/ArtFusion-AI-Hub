const Joi = require("joi");
const BaseDto = require("./baseDto");
const { userJoiSchema } = require("./userDto");

const userRegisterJoiSchema = Joi.object({
    email: userJoiSchema.extract("email"),
    password: userJoiSchema.extract("password"),
});

class UserRegisterDto extends BaseDto {
    constructor(data) {
        super(data);
        this.email = data.email;
        this.password = data.password;
    }

    static fromModel(user) {
        return new UserRegisterDto({
            email: user.email,
            password: user.password,
        });
    }

    toModel() {}
}

module.exports = {
    userRegisterJoiSchema,
    UserRegisterDto,
};
