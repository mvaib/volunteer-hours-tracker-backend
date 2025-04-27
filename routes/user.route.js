const express = require("express")
const { registerValidation, loginValidation } = require("../middlewares/validation.middleware")
const { register, login } = require("../controllers/user.controller")
const userRouter = express.Router()

userRouter.post("/register", registerValidation, register)
userRouter.post("/login", loginValidation, login)

module.exports = {userRouter}