const jwt = require('jsonwebtoken');

const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch(e) {
        res.clearCookie('token');
        res.status(404).json({ expiredToken: true });
    }
}

module.exports = {
    cookieJwtAuth:cookieJwtAuth
}