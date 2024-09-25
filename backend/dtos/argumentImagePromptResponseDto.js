const BaseDto = require("./baseDto");

class ArgumentImagePromptResponseDto extends BaseDto {
    constructor(data) {
        super(data);
        // TODO: specification for this
        this.filter = data.filter;
        this.createdBy = data.createdBy;
        this.extension = data.extension;
        this.imageUrl = "";
    }
}

module.exports = {
    ArgumentImagePromptResponseDto,
};
