const BaseDto = require("./baseDto");

class VideoPromptResponseDto extends BaseDto {
    constructor(data) {
        super(data);
        this.originalVideoUrl = data.originalVideoUrl;
        this.extension = data.extension;
        this.videoUrl = "";
    }
}

module.exports = {
    VideoPromptResponseDto,
};
