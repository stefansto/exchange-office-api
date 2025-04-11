const addUser = async (req, res, db, crypto) => {
    try {
        const users = db.collection('users');
        const query = {
            username: req.body.username,
            password: crypto.createHash('md5').update(req.body.password).digest('hex'),
            active: true
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
}

module.exports = {
    addUser: addUser
}