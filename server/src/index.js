require("dotenv").config();
const express = require("express");

const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorHandler")
const connectDB = require("../config/connectToDB");
const authRouter = require("./routes/user")
const cookieParser = require("cookie-parser")
const rateLimit = require("express-rate-limit");

const { cleanUnverifiedUser } = require("./cronjobs/cleanUnverifiedUser")
const app = express();
app.set("trust proxy", 1);

const siteURL = process.env.SITE_URL;
const PORT = process.env.PORT;

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

const secureLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
})

connectDB(process.env.MONGO_URI);

//middlewares
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// Parse cookies
app.use(cookieParser());

app.use(express.json());

app.use(globalLimiter);

let cachedData = null;
let lastFetchTime = 0;

const extractNepseData = async () => {
    try {
        const now = Date.now();

        if (cachedData && now - lastFetchTime < 180000) {
            return cachedData;
        }
        const keys = [
            "scrip",
            "ltp",
            "percent_change",
            "high",
            "low",
            "LowValue",
            "qty"
        ]
        const nepseData = []
        const { data } = await axios.get(siteURL);
        const $ = cheerio.load(data)
        const elemSelector = "#ctl00_ContentPlaceHolder1_LiveTrading > table > tbody > tr";
        $(elemSelector).each((parentIndex, parentElement) => {
            let keyIndex = 0;
            const marketData = {};
            $(parentElement).children().each((childIndex, childElement) => {
                const tdValue = $(childElement).text();
                if (tdValue) {
                    marketData[keys[keyIndex]] = tdValue;
                }
                keyIndex++;
            })
            nepseData.push(marketData);
        })
        cachedData = nepseData;
        lastFetchTime = now;
        return nepseData
    } catch (error) {
        console.error(error)
    }
}

app.get("/api/nepse/livedata", async (req, res) => {
    try {
        const result = await extractNepseData();
        return res.status(200).json({
            result
        })
    } catch (error) {
        throw error;
    }

})

//Implementing endpoints based rate limiting
app.use("/api/auth/verifyOTP", secureLimiter);

app.use("/api/auth", authRouter);

app.use(errorHandler);

cleanUnverifiedUser();

app.listen(PORT, () => {
    console.log("Server is running on the port:", PORT);
})
