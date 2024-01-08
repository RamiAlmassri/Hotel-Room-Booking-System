const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review: String,
});

module.exports = mongoose.models.reviewSchema || mongoose.model("Review", reviewSchema);