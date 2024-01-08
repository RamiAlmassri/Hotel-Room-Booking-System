const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Sign up user
// @route   POST api/user/signup/
// @access  private
const signUpUser = asyncHandler(async (req, res) => {
    const {name, username, email, password} = req.body;

    // check if any input is empty
    if(!name || !username || !email || !password) {
        throw new Error("Please enter all fields");
    }

    // check if member already exists
    const userExists = await User.findOne({email});
    if(userExists) {
        throw new Error("User already exists");
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create member's account
    const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
    });

    // when the member's account is done created
    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user.id),
        })
    }
});

// @desc    User login
// @route   POST api/user/login
// @access  private
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    
    // if any input id missing
    if(!email || !password) {
        res.status(400);
        throw new Error("Enter all fields");
    }

    // search for the member
    const user = await User.findOne({email});

    // if the member exists and the password he entered is correct
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        throw new Error("Invalid user data");
    }
});

// @desc    profile
// @route   GET api/user/me
// @access  private
const getUser = asyncHandler(async (req, res) => {
    // find the user info
    const {id, name, username, email} = await User.findById(req.user.id);
    
    // return the user info
    res.status(200).json({
        id, name, username, email,
    });
});

// generate a token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
};

module.exports = {
    signUpUser,
    loginUser,
    getUser
}