require("dotenv").config();
const { connectDB, insertAllTrends } = require('./lib');
const express = require("express");
const cors = require('cors');
const { scrape } = require('./scraper');
const app = express();


app.use(cors());
app.use(express.json());


app.get("/", async (req, res) => {

    try {
        const ipAddrss = req.socket.remoteAddress;
        console.log(ipAddrss);

        // scrape data
        const data = await scrape();

        await connectDB();

        const date = new Date().toString();

        await insertAllTrends(data, date, ipAddrss + "");
        console.log(data);

        res.json({
            trends: data,
            date: date,
            address: ipAddrss
        })

    } catch (error) {
        console.log(error);

        res.status(500);
        res.json({ msg: "error occurred!" });
    }
})

let port= process.env.PORT;

app.listen(port, () => {

    console.log("Server Running! ", port);

})

