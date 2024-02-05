const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = "godisawesome";

const fetchUser = (req, res, next) => {
    const authToken = req.header('auth-token');
    if(!authToken) return res.status(401).json({error: "Unauthorized Access"});

    try {
        const data = jwt.verify(authToken, JWT_SECRET_KEY);
        req.user = data;
        next();
    } catch (err) {
        return res.status(401).json({error: "Unauthorized Access"});
    }
};

module.exports = fetchUser;