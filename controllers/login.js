const { createHash } = require('crypto');

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
            res.status(200).json({user: user.username});
        } else {
            res.status(400).json({user: null});
        }
    }
}

module.exports = {
    handleLogin: handleLogin
}