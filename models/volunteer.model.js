const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "user"},
    name : {type : mongoose.Schema.Types.String, ref : "user"},
    hours : {type : Number, required : true},
    date : {type : Date, default : Date.now},
    activity : {type : String, required : true},
},{
    minimize : false,
    versionKey : false
})

const VolunteerModel = mongoose.models.volunteer || mongoose.model("volunteer", volunteerSchema)

module.exports = { VolunteerModel }
