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
        return res.status(200).json({
            errorcode: 0,
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

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        let existingUser = await User.findOne({ email: email })
        if (!existingUser) return res.status(403).json({
            errorcode: 2,
            status: false,
            message: "Email doesn't exists",
            data: null
        })
        let cmpPassword = bcrypt.compareSync(password, existingUser.password)
        if (!cmpPassword) {
            return res.status(403).json({
                errorcode: 3,
                status: false,
                message: "Incorrect Password",
                data: null
            })
        }
        else {
            const token = jwt.sign({ Userid: existingUser }, process.env.JWT_SECRET, { expiresIn: '30s' })
            existingUser = { ...existingUser._doc, password: null, token }
            res.cookie(String(existingUser._id), token, {
                path: '/',
                expires: new Date(Date.now() + 1000 * 30),
                httpOnly: true,
                sameSite: 'lax'
            })
            return res.status(200).json({
                errorcode: 0,
                status: true,
                message: "User Login Successfully",
                data: existingUser
            })
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

exports.searchUser = async (req, res) => {
    try {
        const keyword = req.query.search ? {
            $or: [
                {
                    name: { $regex: req.query.search, $options: "i" }
                },
                {
                    email: { $regex: req.query.search, $options: "i" }
                }
            ]
        }
            :
            {}

        const users = await User.find(keyword) //.find({ _id: { $ne: req.user._id } })
        return res.status(200).json({
            errorcode: 0,
            status: true,
            message: "user find successfully",
            data: users
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