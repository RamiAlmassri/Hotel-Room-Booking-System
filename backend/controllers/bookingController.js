const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

const bookRoom = asyncHandler(async (req, res) => {
    const { user, roomType, checkInDate, checkOutDate } = req.body;

    if(!user || !roomType || !checkInDate || !checkOutDate) {
        throw new Error("Please enter all fields");
    }

    const newBooking = await Booking.create({user, roomType, checkInDate, checkOutDate});

    if(newBooking) {
        return true;
    }
});

const getUserBookings = asyncHandler(async (req, res) => {
    const {id} = await User.findById(req.user._id);

    const booking = await Booking.find({user: id});

    if(booking) {
        res.status(200).json(booking);
    }
});

const deleteBooking = asyncHandler(async (req, res) => {
    const bookingId = req.params.id;

    const removeBooking = await Booking.findByIdAndDelete(bookingId);

    if(removeBooking) {
        res.status(200).json(removeBooking);
    }
});

module.exports = {
    bookRoom,
    getUserBookings,
    deleteBooking
}