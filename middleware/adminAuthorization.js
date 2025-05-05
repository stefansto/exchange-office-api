const adminAuthorization = (req, res, next) => {
    if(req.body.reqRole && req.body.reqRole === 'admin'){
        next();
    } else {
        res.status(401).json({ errorMessage: 'Unauthorized' });
    }
}

module.exports = {
    adminAuthorization:adminAuthorization
}