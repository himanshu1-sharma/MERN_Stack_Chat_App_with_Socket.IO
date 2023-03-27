require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { DB_CONNECT } = process.env;
var router = express()

const UserRouter = require("./routes/User.routes");
const ChatRouter = require("./routes/Chat.routes")
const { notFound, errorHandler } = require("./middleware/errorMiddleware");


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
app.use("/api/user", UserRouter)
app.use("/api/chat", ChatRouter)


app.get('/', (req, res) => {
    res.send("api is running")
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

let PORT = process.env.PORT || 6050;

app.listen(PORT, () => {
    console.log(`app in running on ${PORT} port`)
})