const mongoose = require("mongoose");

const UserSessionSchema = new mongoose.Schema(
    {
        refreshToken: String,
        ipAddress: String,
        userAgent: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        expiresAt: Date,
    },
    { timestamps: true }
);

UserSessionSchema.index({ userId: 1 });

const UserSession = mongoose.model("UserSession", UserSessionSchema);

module.exports = UserSession;
