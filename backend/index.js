require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { DB_CONNECT } = process.env;
var router = express()


app.use(express.json())
app.use(cors())

//db connect

mongoose.connect(DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
let db = mongoose.connection
db.once("open", () => console.log("Connected to MongoDB"));
db.on("disconnected", () => console.log("Disonnected to MongoDB"));
db.on("reconnected", () => console.log("Reconnected to MongoDB"));
db.on("error", (err) => console.log(err));

//routes

router.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("api is running")
})

let PORT = process.env.PORT || 6050;

app.listen(PORT, () => {
    console.log(`app in running on ${PORT} port`)
})