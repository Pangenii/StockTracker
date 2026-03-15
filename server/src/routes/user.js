const express = require("express");
const { register, login, verifyEmail } = require("../controllers/user.controller")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifyOTP", verifyEmail)


module.exports = router;