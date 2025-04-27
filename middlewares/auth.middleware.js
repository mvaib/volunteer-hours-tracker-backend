// middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, msg: "Unauthorized" });
    }

    const actualToken = token.split(" ")[1];

    try {
        const decodedToken = jwt.verify(actualToken, process.env.SECRET_KEY);
        req.body.userId = decodedToken.userId;
        req.body.name = decodedToken.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, msg: "Token verification error", error: error.message });
    }
}

module.exports = { auth };
