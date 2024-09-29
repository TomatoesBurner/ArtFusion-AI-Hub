class TokenDto {
    constructor(data) {
        this.token = data.token;
        this.expiresAt = data.expiresAt;
    }
}

module.exports = {
    TokenDto,
};
