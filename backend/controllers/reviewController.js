const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewsModel");

// @desc    Sign up user
// @route   POST api/user/signup/
// @access  private
const addReview = asyncHandler(async (req, res) => {
    const {review} = req.body;

    // check if any input is empty
    if(!review) {
        throw new Error("Please enter a review");
    }

    // add new review
    const newReview = await Review.create({
        review
    });

    // when the member's account is done created
    if(newReview) {
        res.status(201).json({
            newReview
        })
    }
});

module.exports = {
    addReview
}