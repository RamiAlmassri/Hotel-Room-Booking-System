const { addReview } = require("./reviewController");
const asyncHandler = require("express-async-handler");

describe("Review validation", () => {
    // test for the condtidion where a user sends a review that's empty
    it("Review: Should enter a review", asyncHandler(async () => {
        const req = {
            body: {
                review: ""
            }
        };

        await expect(addReview(req, res={})).rejects.toThrowError("Please enter a review");
    }));
});