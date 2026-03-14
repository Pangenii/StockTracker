require("dotenv").config();
const express = require("express");
const app = express();
const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorHandler")
const connectDB = require("../config/connectToDB");
const authRouter = require("./routes/user")

const siteURL = process.env.SITE_URL;
const PORT = process.env.PORT;

connectDB(process.env.MONGO_URI);

//middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());


const extractNepseData = async () => {
    try {
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
        throw new error;
    }

})

app.use("/api/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server is running on the port:", PORT);
})
