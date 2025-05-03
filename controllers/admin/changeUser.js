const { hashPassword } = require('../../utils/passHashing');

const handleChangeUser = async (req, res, db) => {
    console.log("POST request sent for /admin/changeuser with body: ", req.body);
    if(req.body.reqRole && req.body.reqRole === 'admin'){
        try {
            const newHashedPassword = await hashPassword(req.body.newPassword).then((res)=>{return res});
            const users = db.collection('users');
            const result = await users.updateOne(
                {username: req.body.username },
                {$set: { password: newHashedPassword, role: req.body.newRole }}
            );
            if(await result.acknowledged){
                res.status(200).json({ message: 'Success' });
            } else {
                throw Error;
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
    handleChangeUser: handleChangeUser
}