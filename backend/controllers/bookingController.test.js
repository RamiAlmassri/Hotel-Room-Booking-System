const { bookRoom } = require("./bookingController");
const asyncHandler = require("express-async-handler");

describe("Booking validation", () => {
     // test for the condtidion where a user is making a booking but hasn't entered all fields
    it("Booking: Should enter all fields", asyncHandler(async () => {
        const req = {
            body: {
                user: "e324r544w2r6322r",
                roomType: "Single",
                checkInDate: "2024-1-10"
            }
        };

        await expect(bookRoom(req, res={})).rejects.toThrowError("Please enter all fields");
    }));
});