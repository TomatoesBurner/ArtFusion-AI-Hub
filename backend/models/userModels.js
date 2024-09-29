const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { AUTH_METHOD_VALUES } = require("../types/authMethodTypes");
const { THEME_MODE_VALUES, THEME_MODE } = require("../types/themeModeTypes");

//name email,password,images,videos,passwordConfirm
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            maxlength: [
                20,
                "A user name must have less or equal than 20 characters",
            ],
            minlength: [
                4,
                "A user name must have more or equal than 4 characters.",
            ],
        },
        firstName: String,
        lastName: String,
        email: {
            type: String,
            trim: true,
            required: [true, "Please provide your email."],
            unique: true,
            validate: [validator.isEmail, "Please provide a valid email."],
        },
        password: {
            type: String,
            required: [true, "Please provide a password!"],
            minlength: 8,
            select: false,
        },

        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,

        registerMethod: {
            type: String,
            enum: AUTH_METHOD_VALUES,
            default: "email",
        },
        themeMode: {
            type: String,
            enum: THEME_MODE_VALUES,
            default: THEME_MODE.DARK,
        },
        joinedAt: {
            type: Date,
            default: Date.now(),
        },
        totpSecret: {
            type: String,
        },
        lastLoginAt: Date,
        totpVerifiedAt: Date,
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        // console.log(changedTimestamp, JWTTimestamp);
        return JWTTimestamp < changedTimestamp; // 100<200
    }
    // false means NOT change
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
