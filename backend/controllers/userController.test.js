const { signUpUser, loginUser } = require("./userController");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv").config();
const connectDB = require("../config/db");

describe("User validation", () => {
    connectDB();
    // test for the condition when the user doesn't enter all his fields
    it("Sign-up: Should enter all fields", asyncHandler(async () => {
        const req = {
            body: {
                username: "Ramy",
                name: "Ramy123",
                password: "pass",
            }
        };

        await expect(signUpUser(req, res={})).rejects.toThrowError("Please enter all fields");
    }));
    // test for the condition when the user entered an email that already exists
    it("Sign-up: An account already exists", asyncHandler(async () => {
        const req = {
            body: {
                username: "Ramy",
                name: "Ramy123",
                password: "ramy2024",
                email: "ramy@gmail.com"
            }
        };

        await expect(signUpUser(req, res={})).rejects.toThrowError("User already exists");
    }), 30000);
    // test for the condition when the user entered a wrong email or password
    it("Login: User nor found", asyncHandler(async () => {
        const req = {
            body: {
                password: "ramy2024653",
                email: "ramy1234@gmail.com"
            }
        };

        await expect(loginUser(req, res={})).rejects.toThrowError("Invalid user data");
    }), 30000);
});