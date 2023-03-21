const express = require("express")
const router = express.Router()
const Controller = require("../controller/User.controller")

router.post("/register", Controller.registerUser)


module.exports = router