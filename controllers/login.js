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
        return res.status(400).json({user: null});
    } else {
        let user = await findUser(username, database);
        if(user){
            if(await compareHash(password, user.password)){
                const token = jwt.sign({username: user.username, id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: true });
                res.status(200).json({user: user.username});
            } else {
                res.status(400).json({user:null});
            }
        } else {
            res.status(400).json({user: null});
        }
    }
}

module.exports = {
    handleLogin: handleLogin
}