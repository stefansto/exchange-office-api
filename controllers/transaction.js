const handleTransaction = (req, res, database) => {
    console.log('handleTransaction');
    console.log(req.body);
    res.status(200).json(req.body);
}

module.exports = {
    handleTransaction: handleTransaction
}