const User = require("../model/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.registerUser = async (req, res) => {
    try {
        let { name, email, password, profilepic } = req.body
        if (!name || !email || !password) return res.status(400).json({
            errorcode: 2,
            status: false,
            message: "Please Enter All The Feilds",
            data: null
        })
        let emailExist = await User.findOne({ email: email })
        if (emailExist) return res.status(403).json({
            errorcode: 2,
            status: false,
            message: "Email already use",
            data: null
        })
        const hashedPassword = bcrypt.hashSync(password)
        let user = new User({
            name,
            email,
            password: hashedPassword,
            profilepic
        })

        user = await user.save()
        return res.status(403).json({
            errorcode: 2,
            status: false,
            message: "Registered Successfully",
            data: user
        })
    } catch (error) {
        return res.status(204).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }
}