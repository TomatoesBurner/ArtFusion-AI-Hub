const Joi = require("joi");
const BaseDto = require("./baseDto");
const { userJoiSchema } = require("./userDto");

const userRegisterJoiSchema = Joi.object({
    name: userJoiSchema.extract("name"),
    firstName: userJoiSchema.extract("firstName"),
    lastName: userJoiSchema.extract("lastName"),
    email: userJoiSchema.extract("email"),
    password: userJoiSchema.extract("password"),
});

class UserRegisterDto extends BaseDto {
    constructor(data) {
        super(data);
        this.name = data.name;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.password = data.password;
    }

    static fromRequest(data) {
        return new UserRegisterDto(data);
    }

    static fromModel(user) {
        return new UserRegisterDto({
            email: user.email,
            password: user.password,
            name: user.name,
            firstName: user.firstName,
            lastName: user.lastName,
        });
    }

    toModel() {}
}

module.exports = {
    userRegisterJoiSchema,
    UserRegisterDto,
};
