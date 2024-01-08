const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { signUpUser, loginUser, getUser } = require("../controllers/userController");

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/me",  protect, getUser);

module.exports = router;