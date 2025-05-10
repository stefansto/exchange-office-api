const { hashPassword } = require('../../utils/passHashing');

const handleChangeUser = async (req, res, db) => {
    console.log("POST request sent for /admin/changeuser with body: ", req.body);
    try {
        const users = db.collection('users');
        const filter = {username: req.body.username };
        const query = {$set: { role: req.body.newRole }};
        if(req.body.newPassword != ''){
            const newHashedPassword = await hashPassword(req.body.newPassword).then((res)=>{return res});
            query.$set.password = newHashedPassword;
        }
        const result = await users.updateOne(filter, query);
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
    handleChangeUser: handleChangeUser
}