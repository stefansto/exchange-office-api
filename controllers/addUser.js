const { createHash } = require('crypto');

const handleAddUser = async (req, res, db) => {
    console.log("POST request sent for /adduser with body: ", req.body);
    if(req.body.authorized){
        try {
            const users = db.collection('users');
            const query = {
                username: req.body.username,
                password: createHash('md5').update(req.body.password).digest('hex'),
                active: true,
                date: new Date()
            }
            const result = await users.insertOne(query);
            if(await result.acknowledged){
                res.status(200).json({message: 'Success'});
            } else {
                res.status(400).json({message: 'Error'});
            }
        } catch(e) {
            console.log('Error: ', e);
            res.status(500).json({message: 'Error'});
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = {
    handleAddUser: handleAddUser
}