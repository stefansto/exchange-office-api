const findFilterTransactions = async (checkedValues, database) => {
    try {
        let transactionArray = [];
        const transactions = database.collection('transactions');

        let query = {$and:[]};
        for (const element in checkedValues) {
            if(checkedValues[element].length){
                query.$and.push({ [element]: { $in: checkedValues[element]} });
            }
        }
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
    console.log("POST request sent for /filter with body: ", req.body);
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