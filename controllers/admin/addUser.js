const { hashPassword } = require('../../utils/passHashing');

const handleAddUser = async (req, res, db) => {
    console.log("POST request sent for /admin/adduser with body: ", req.body);
    if(req.body.reqRole && req.body.reqRole === 'admin'){
        if(/[\w\.]{4,16}/.test(req.body.username) && /[\w\.]{4,16}/.test(req.body.password)){
            try {
                const hashedPassword = await hashPassword(req.body.newPassword).then(res => {return res});
                const users = db.collection('users');
                const query = {
                    username: req.body.newUsername,
                    password: hashedPassword,
                    active: true,
                    date: new Date(),
                    role: req.body.newRole
                }
                const result = await users.insertOne(query);
                if(await result.acknowledged){
                    res.status(200).json({ message: 'Successfully added a new user' });
                } else {
                    throw Error;
                }
            } catch(e) {
                console.log('Error: ', e);
                if(e.errorResponse){
                    if(e.errorResponse.code && e.errorResponse.code === 11000){
                        res.status(400).json({ errorMessage: 'User already exists!' });
                    }
                } else {
                    res.status(500).json({ errorMessage: 'Server Error! Please try again.' });
                }
            }
        } else {
            res.status(400).json({ errorMessage: 'Invalid credentials submited!' });
        }
    } else {
        res.status(401).json({ errorMessage: 'Unauthorized access!' });
    }
}

module.exports = {
    handleAddUser: handleAddUser
}