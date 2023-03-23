const express = require("express")
const router = express.Router()
const Controller = require("../controller/User.controller")
const { protect } = require("../middleware/authMiddleware")

router.post("/register", Controller.registerUser)
router.post("/login", Controller.userLogin)
router.get("/search", Controller.searchUser)


module.exports = router