const handleActivateUser = async (req, res, db) => {
    console.log("POST request sent for /admin/activateuser with body: ", req.body);
    try {
        const users = db.collection('users');
        const filter = { username: req.body.username }
        const updateDocument = { $set : { active: req.body.status}}
        const result = await users.updateOne(filter, updateDocument);
        console.log(await result)
        if(await result.acknowledged){
            res.status(200).json({ message: 'Success' });
        } else {
            throw Error;
        }
    } catch(e) {
        console.log('Error: ', e);
        res.status(500).json({ errorMessage: 'Error' });
    }
}

module.exports = {
    handleActivateUser: handleActivateUser
}