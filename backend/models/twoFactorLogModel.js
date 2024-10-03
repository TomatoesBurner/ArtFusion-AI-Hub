const { default: mongoose } = require("mongoose");

const TwoFactorLogSchema = new mongoose.Schema(
    {
        token: String,
        userId: { type: mongoose.Types.ObjectId, ref: "User" },
        expiresAt: Date,
        consumedAt: Date,
    },
    { timestamps: true }
);

TwoFactorLogSchema.index({ userId: 1, token: 1 });

const TwoFactorLog = mongoose.model("TwoFactorLog", TwoFactorLogSchema);

module.exports = TwoFactorLog;
