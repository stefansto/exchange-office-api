const { createHash } = require('crypto');
const jwt = require('jsonwebtoken');

const findUser = async (username, password, database) => {
    try {
        const users = database.collection('users');
        const query = { username: username, password: password};
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
        let user = await findUser(username, createHash('md5').update(password).digest('hex'), database);
        if(user){
            const token = jwt.sign({username: user.username, id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({user: user.username});
        } else {
            res.status(400).json({user: null});
        }
    }
}

module.exports = {
    handleLogin: handleLogin
}