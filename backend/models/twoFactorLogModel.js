const { default: mongoose } = require("mongoose");

const TwoFactorLogSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User" },
        expiresAt: {
            type: Date,
            default: Date.now(),
        },
        consumedAt: Date,
    },
    { timestamps: true }
);

TwoFactorLogSchema.index({ userId: 1 });

const TwoFactorLog = mongoose.model("TwoFactorLog", TwoFactorLogSchema);

module.exports = TwoFactorLog;
