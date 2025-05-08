const { compareHash } = require('../utils/passHashing');
const jwt = require('jsonwebtoken');

const findUser = async (username, database) => {
    try {
        const users = database.collection('users');
        const query = { username: username };
        return await users.findOne(query);
    } catch(error) {
        console.log('Error ', error);
    }
}

const handleLogin = async (req, res, database) => {
    console.log("POST request sent for /login with body: ", req.body);
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(401).json({errorMessage: 'Missing credentials!'});
    } else {
        let user = await findUser(username, database);
        if(user){
            if(user.active){
                if(await compareHash(password, user.password)){
                    const token = jwt.sign({username: user.username, id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.cookie('token', token, { httpOnly: true });
                    res.status(200).json({user: user.username, role: user.role});
                } else {
                    res.status(401).json({errorMessage:'Invalid username or password!'});
                }
            } else {
                res.status(400).json({errorMessage: 'Inactive user!'});
            }
        } else {
            res.status(401).json({errorMessage: 'User does not exist!'});
        }
    }
}

module.exports = {
    handleLogin: handleLogin
}