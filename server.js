const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { volunteerRouter } = require("./routes/volunteer.route");
const PORT = 8080;

const app = express()

app.use(express.json())
app.use(express.text())
app.use(cors())

app.use("/api/user", userRouter)
app.use("/api/volunteer", volunteerRouter)

const startServer = async () => {
    try {
        await dbConnection()

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error("Failed to connect to database", error.message)
        process.exit(1)
    }
}

startServer()