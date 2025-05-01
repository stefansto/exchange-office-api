const findTransactions = async (database) => {
    try {
        let transactionsArray = [];
        const transactions = database.collection('transactions');
        const foundTransactions = await transactions.find({});
        for await (const singleTransaction of foundTransactions){
            transactionsArray.push(singleTransaction);
        }
        return transactionsArray;
    } catch(error) {
        console.log("Error :", error);
        return null;
    }
}

const handleGetTransaction = async (res, database) => {
    console.log("GET request sent for /transaction");
    let transactions = await findTransactions(database);
    if(transactions){
        let dataToSendBack = {
            transactions: transactions
        }
        res.status(200).json({res: dataToSendBack});
    } else {
        res.status(503).json({errorMessage: 'Transaction service unavailable, try again later!'});
    }
}

module.exports = {
    handleGetTransaction:handleGetTransaction
}