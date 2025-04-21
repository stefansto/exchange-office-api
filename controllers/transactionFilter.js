const findFilterTransactions = async (checkedValues, database) => {
    try {
        let transactionArray = [];
        const transactions = database.collection('transactions');

        let name = 'currencyIn';
        
        const query = { [name]: { $in: checkedValues}};
        const filteredTransactions = await transactions.find(query);
        for await (const oneTransaction of filteredTransactions){
            transactionArray.push(oneTransaction);
        }
        return transactionArray;
    } catch(error) {
        console.log("Error :", error);
        return null;
    }
}

const handleFilterTransactions = async (req, res, database) => {
    let transactions = await findFilterTransactions(req.body.checked, database);
    if(transactions){
        let dataToSendBack = {
            transactions: transactions
        }
        res.status(200).json({res: dataToSendBack});
    } else {
        res.status(503).json({res: null});
    }
}

module.exports = {
    handleFilterTransactions:handleFilterTransactions
}