const mongoose = require("mongoose")
require("dotenv").config()
const dbConnection = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log(`Database connected successfully!`)
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = {dbConnection}