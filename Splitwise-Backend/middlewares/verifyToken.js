const JWT = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async function(req, res, next) {
    const token = req.header("X-auth-token");
    if (!token) return res.status(401).send("Access-Denied");

    try {
        const verified = JWT.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;

        // Fetch user data including currency from the database
        const user = await User.findById(verified._id);

        if (!user) {
        return res.status(404).json({ message: "User not found." });
        }

        // Add currency to the req.user object
        req.user = {
        userId: user._id,
        currency: user.currency,
        };

        next();
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: "Invalid User" });
    }
};

module.exports = verifyToken;