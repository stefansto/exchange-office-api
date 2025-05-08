const { database } = require("../database/connection");

const adminAuthorization = async (req, res, next) => {
    try {
        let username = req.user.username;

        const users = database.collection('users');
        const query = {
            username: username
        }
        const result = await users.findOne(query);

        if(result.role === 'admin'){
            next();
        } else {
            res.status(401).json({ errorMessage: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({errorMessage: 'Server Error!'});
    }
}

module.exports = {
    adminAuthorization:adminAuthorization
}