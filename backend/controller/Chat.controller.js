const Chat = require("../model/Chat.model")
const User = require("../model/User.model")

exports.accessChat = async (req, res) => {
    try {
        const { userId } = req.body
        if (!userId) return res.status(400).json({
            errorcode: 5,
            status: false,
            message: "userid not found",
            data: error
        })

        let isChat = await Chat.find({
            isGroupChat: false,
            $all: [req.user._id, userId]
        }).populate("users", "-password").populate("latestMessage")

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name profilepic, email"
        })

        if (isChat.length > 0) {
            return res.status(200).json({
                errorcode: 0,
                status: false,
                message: "Chat find successfully",
                data: isChat[0]
            })
            // res.send(isChat[0])
        } else {
            let chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId]
            }

            try {
                const createdChat = await Chat.create(chatData)
                const fullChat = await (await Chat.findOne({ _id: createdChat._id })).populate("users", "-password")
                return res.status(200).json({
                    errorcode: 0,
                    status: false,
                    message: "Full chat Create successfully",
                    data: fullChat
                })
            } catch (error) {
                return res.status(400).json({
                    errorcode: 5,
                    status: false,
                    message: error.message,
                    data: error
                })
            }
        }

    } catch (error) {
        console.log(error)
        return res.status(204).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }
}

exports.fetchChat = async (req, res) => {
    try {

    } catch (error) {
        return res.status(204).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }
}

exports.createGroupChat = async (req, res) => {
    try {

    } catch (error) {
        return res.status(204).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }
}

exports.renameGroup = async (req, res) => {
    try {

    } catch (error) {
        return res.status(204).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }
}

exports.removeFromGroup = async (req, res) => {
    try {

    } catch (error) {
        return res.status(204).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }
}

exports.addToGroup = async (req, res) => {
    try {

    } catch (error) {
        return res.status(204).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }
}