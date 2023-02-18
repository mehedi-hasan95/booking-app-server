const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// Require from Routes
const userRoute = require("./routes/hotel");
const bookRoute = require("./routes/room");

mongoose.set("strictQuery", false);

// Midleware
app.use(cors());
app.use(express.json());

// Custom Midleware
app.use("/api/user", userRoute);
app.use("/api/room", bookRoute);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
};
app.get("/", (req, res) => {
    res.send("Hello from Traveller.com");
});

app.listen(port, () => {
    connect();
    console.log(`Traveller app server listening on port ${port}`);
});