const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a name"]
    },
    username: {
        type: String,
        required: [true, "please add a username"]
    },
    email: {
        type: String,
        required: [true, "please add an email"]
    },
    password: {
        type: String,
        required: [true, "please add a password"]
    },
}, {
    timestamps: true
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);