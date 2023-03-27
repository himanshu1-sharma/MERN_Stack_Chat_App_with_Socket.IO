const express = require("express")
const router = express.Router()
const Controller = require("../controller/Chat.controller")

router.post("/", Controller.accessChat)
router.get("/", Controller.fetchChat)
router.post("/create-group", Controller.createGroupChat)
router.put("/rename-group", Controller.renameGroup)
router.put("/group-remove", Controller.removeFromGroup)
router.put("/group-add", Controller.addToGroup)

module.exports = router