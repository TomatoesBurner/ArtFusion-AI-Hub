const Joi = require("joi");

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

    static fromModel(user) {
        return new UserLoginDto({
            email: user.email,
            password: user.password,
        });
    }

    toModel() {}
}

module.exports = {
    userLoginJoiSchema,
    UserLoginDto,
};
