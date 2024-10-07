const BaseDto = require("./baseDto");

class ArgumentImagePromptResponseDto extends BaseDto {
    // Use for both upload and download
    constructor(data) {
        super(data);
        // TODO: specification for this
        this.filters = data.filters;
        this.createdBy = data.createdBy;
        this.extension = data.extension;
        this.imageUrl = undefined;
        this.uploadUrl = undefined;
    }

    static fromModel(data) {
        return new ArgumentImagePromptResponseDto(data);
    }
}

module.exports = {
    ArgumentImagePromptResponseDto,
};
