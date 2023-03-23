const jwt = require("jsonwebtoken")
const User = require("../model/User.model")
const asyncHandler = require("express-async-handler")

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]

            //decode token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            next();
        } catch (error) {
            return res.status(401).json({
                errorcode: 5,
                status: false,
                message: error.message,
                data: error
            })
        }
    }

    if (!token) {
        return res.status(401).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }
})


module.exports = { protect }