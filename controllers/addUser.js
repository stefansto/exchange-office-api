const { hashPassword } = require('../utils/passHashing');

const handleAddUser = async (req, res, db) => {
    console.log("POST request sent for /adduser with body: ", req.body);
    if(req.body.authorized){
        try {
            const hashedPassword = await hashPassword(req.body.password).then(res => {return res});
            const users = db.collection('users');
            const query = {
                username: req.body.username,
                password: hashedPassword,
                active: true,
                date: new Date()
            }
            const result = await users.insertOne(query);
            if(await result.acknowledged){
                res.status(200).json({ message: 'Success' });
            } else {
                res.status(400).json({ errorMessage: 'Error' });
            }
        } catch(e) {
            console.log('Error: ', e);
            res.status(500).json({ errorMessage: 'Error' });
        }
    } else {
        res.status(401).json({ errorMessage: 'Unauthorized' });
    }
}

module.exports = {
    handleAddUser: handleAddUser
}