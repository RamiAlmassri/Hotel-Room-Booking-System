const mongoose = require("mongoose");
const User = require("./userModel");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    roomType: String,
    checkInDate: String,
    checkOutDate: String
});

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);