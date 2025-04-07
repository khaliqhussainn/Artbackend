// middleware/authenticate.js
const jwtProvider = require("../config/jwtProvider.js");
const userService = require("../service/userService.js");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(404).send({ error: "Token not found....." });
        }

        const userId = jwtProvider.getUserIdFromToken(token);
        // Fix: Add await here
        const user = await userService.findUserById(userId);
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = authenticate;