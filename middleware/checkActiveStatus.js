const { database } = require("../database/connection");

const checkActiveStatus = async(req, res, next) => {
    try {
        let username = req.user.username;

        const users = database.collection('users');
        const query = {
            username: username
        }
        const result = await users.findOne(query);

        if(result.active){
            next();
        } else {
            res.status(400).json({errorMessage: 'Inactive User!'});
        }
    } catch (error) {
        res.status(500).json({errorMessage: 'Server Error!'});
    }
}

module.exports = {
    checkActiveStatus:checkActiveStatus
}