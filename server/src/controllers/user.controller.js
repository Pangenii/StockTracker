const { validateRegisterInput, validateLoginInput } = require("../utils/validation.js");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken")

const logger = require("../utils/logger");
const User = require("../models/user.model.js");
//USER REGISTRATION
const register = async (req, res) => {
    logger.info("Register Endpoint hit");
    try {
        //VALIDATE
        const { error } = validateRegisterInput(req.body);
        if (error) {
            logger.warn("Validation Error", error.details[0].message);
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            })
        }
        const { username, email, password } = req.body;
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            logger.warn("User with this credentials is already registered.")
            return res.status(409).json({
                success: false,
                message: "User is already registered."
            })
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        user = new User({ username, email, password, verificationToken: otp, verificationTokenExpires: Date.now() + 10 * 60 * 1000 });
        await user.save();

        await sendEmail(
            email,
            "Verify your email",
            `Your verification code is ${otp}`
        )
        logger.info("Email sent successfully ")


        res.status(201).json({
            success: true,
            message: "Account created. Please verify your email.",
        })
    } catch (error) {
        logger.error("Registration error", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//VERIFY ENAIL

const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.verificationToken !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        if (user.verificationTokenExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;

        await user.save();
        const { accessToken, refreshToken } = await generateToken(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        res.json({
            success: true,
            message: "Email verified successfully",
            accessToken
        });
    } catch (error) {
        logger.error("Verification error", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//USER LOGIN
const login = async (req, res) => {
    logger.info("Login Endpoint hit");

    try {
        const { error } = validateLoginInput(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { identifier, password } = req.body;

        const user = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email first"
            })
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const { accessToken, refreshToken } = await generateToken(user);

        // SET REFRESH TOKEN COOKIE
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.json({
            success: true,
            message: "Login Successful !",
            accessToken,
            username: user.username
        });

    } catch (error) {
        logger.error("Login error", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = { register, login, verifyEmail }