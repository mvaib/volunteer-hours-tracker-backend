
const { VolunteerModel } = require("../models/volunteer.model")

const createVolunteer = async (req, res) => {
    const {userId, name ,hours, date, activity} = req.body
    try {
        const newVolunteer = new VolunteerModel({
            userId,
            name,
            hours,
            date,
            activity
        })
        
        await newVolunteer.save()
        res.status(200).json({success : true, msg : "Volunteer created successfully!"})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success : false, msg : "Error", error : error.message})
    }
}

const volunteerList = async (req, res) => {
    const {userId} = req.body
    try {
        const volunteers = await VolunteerModel.find({userId})
        res.status(200).json({success : true, data : volunteers})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success : false, msg : "Error", error : error.message})
    }
}

module.exports = { createVolunteer, volunteerList }