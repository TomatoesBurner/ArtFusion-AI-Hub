const BaseDto = require("./baseDto");

class UserMeDto extends BaseDto {
    constructor(data) {
        super(data);
        this.userId = data.userId;
        this.name = data.name;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.registerMethod = data.registerMethod;
        this.themeMode = data.themeMode;
        this.joinedAt = data.joinedAt;
        this.lastLoginAt = data.lastLoginAt;
        this.imagePromptSpaceId = data.imagePromptSpaceId;
        this.videoPromptSpaceId = data.videoPromptSpaceId;
    }
}

module.exports = {
    UserMeDto,
};
