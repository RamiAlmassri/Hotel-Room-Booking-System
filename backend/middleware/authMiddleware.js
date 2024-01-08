const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    var token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // get token from the request headers
            token = req.headers.authorization.split(" ")[1];

            // check if the token is valid
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // check if the user
            req.user = await User.findById(decoded.id).select("-password");

            // we can proceed with request
            next();

            return;
        } catch(error) {
            res.status(401);
            throw new Error("not authorized")
        }
    }

    if(!token) {
        res.status(401);
        throw new Error("no token, not authorized");
    }
});

module.exports = { protect };