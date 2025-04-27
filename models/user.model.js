const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
},{
    minimize : false,
    versionKey : false
})

const UserModel = mongoose.models.user || mongoose.model("user", userSchema)

module.exports = { UserModel }