const { UserModel } = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const register = async (req, res) => {
    const {name, email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user) return res.status(400).json({success : false, msg : "User already exists!"})
        const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS)
        const hash = await bcrypt.hash(password, salt)
        if(!hash) return res.status(400).json({success : false, msg : "Hash Error"})
        const newUser = new UserModel({
            name,
            email,
            password : hash
        })

        await newUser.save()

        return res.status(200).json({success : true, msg : "User registered successfully!"})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success : false, msg : "Error", error : error.message})
    }
}

const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user) return res.status(400).json({success : false, msg : "User not found"})

        const isMatching = await bcrypt.compare(password, user.password)
        if(!isMatching) return res.status(400).json({success : false, msg : "Invalid Password"})

        const token = jwt.sign({userId : user._id, user : user.name}, process.env.SECRET_KEY,{expiresIn : "3d"})

        res.status(200).json({success : true, msg : "User logged in successfully!", token, user})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success : false, msg : "Error", error : error.message})
    }
}

module.exports = {register, login}