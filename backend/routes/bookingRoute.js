const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { bookRoom, getUserBookings, deleteBooking } = require("../controllers/bookingController");

router.post("/", bookRoom);
router.get("/userBookings", protect, getUserBookings);
router.delete("/delete/:id",  protect, deleteBooking);

module.exports = router;