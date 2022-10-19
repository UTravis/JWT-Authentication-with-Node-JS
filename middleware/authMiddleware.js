const jwt = require("jsonwebtoken");

/**
 * Authentication Middleware For Routes
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Next} next 
 */

module.exports = async (req, res, next) => {
    // Checks header to token
    const token = req.header('Authorization');
    if(! token) return res.status(403).json({AuthError : "Access Decied"})

    try {
        // Verifies the token
        const payloadData = await jwt.verify(token, process.env.SECRET);
        req.payload = payloadData;
        next();
    } catch (error) {
        res.status(403).json({AuthError : "Invalid Access Token"})
    }
}