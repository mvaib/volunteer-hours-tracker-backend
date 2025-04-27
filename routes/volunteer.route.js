const express = require("express");
const { auth} = require("../middlewares/auth.middleware");
const { createVolunteer, volunteerList } = require("../controllers/volunteer.controller");
const volunteerRouter = express.Router();

volunteerRouter.post("/create-volunteer", auth, createVolunteer)
volunteerRouter.post('/volunteer-list', auth, volunteerList)
module.exports = {volunteerRouter}