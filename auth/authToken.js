const jwt = require('jsonwebtoken');
const {config} = require('../config/secret')

exports.authToken = (req, res, next) => {
    // נבדוק אם בכלל נשלח טוקן
    let token = req.header('x-api-key');
    if (!token) {
        return res.status(401).json({ msg: 'You must send token to this endpoint url' });
    }
    // לבדוק אם הטוקן תקני או בתוקף
    try {
        let decodeToken = jwt.verify(token, config.tokenSecret);
        req.tokenData = decodeToken;
        // אם הכל בסדר נעבור לפונקציה הבאה
        next();
    }
    catch (error) {
        return res.status(401).json({ msg: 'Token invalid or expired..' });
    }
}