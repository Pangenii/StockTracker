const { validateRegisterInput, validateLoginInput } = require("../utils/validation.js");

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
                message: "User with this credentials is already registered."
            })
        }
        user = new User({ username, email, password });
        await user.save();
        logger.info("User registered successfully.")

        const { accessToken, refreshToken } = await generateToken(user);
        res.status(201).json({
            success: true,
            message: "Registration successful. Please verify your email.",
            accessToken,
            refreshToken
        })
    } catch (error) {
        logger.error("Registration error", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
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
            secure: false,
            sameSite: "strict"
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

module.exports = { register, login }