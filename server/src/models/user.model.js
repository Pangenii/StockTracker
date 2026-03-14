const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    }
}, { timestamps: true });


userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await argon2.hash(this.password);
    }
});

//COMPARE PASSWORD METHOD, USED WHILE CREATING ACCOUNT OR UPDATING PASSWORD
userSchema.methods.comparePassword = async function (userPassword) {
    try {
        return await argon2.verify(this.password, userPassword);
    } catch (error) {
        throw error;
    }
}


const User = mongoose.model("User", userSchema);

module.exports = User;