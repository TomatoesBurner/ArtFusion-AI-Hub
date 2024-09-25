const BaseDto = require("./baseDto");

class ImagePromptResponseDto extends BaseDto {
    constructor(data) {
        super(data);
        this.originalImageUrl = data.originalImageUrl;
        this.extension = data.extension;
        this.imageUrl = "";
    }
}

module.exports = {
    ImagePromptResponseDto,
};
