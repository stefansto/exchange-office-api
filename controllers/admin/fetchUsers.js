const handleFetchUsers = async (req, res, db) => {
    console.log("POST request sent for /admin/fetchusers with body:", req.body);
    if(req.body.reqRole && req.body.reqRole === 'admin'){
        try {
            let usersArray = [];
            const users = db.collection('users');
            const result = await users.find({});
            for await (const user of result) {
                usersArray.push({ id: user._id, username:user.username, active: user.active, role:user.role});
            }
            await res.status(200).json({ users: usersArray });
        } catch(e) {
            console.log('Error: ', e);
            res.status(500).json({ errorMessage: 'Error' });
        }
    } else {
        res.status(401).json({ errorMessage: 'Unauthorized' });
    }
}

module.exports = {
    handleFetchUsers: handleFetchUsers
}