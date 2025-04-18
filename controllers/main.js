async function findTransactions(database) {
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

async function findCurrencies(database) {
    try {
        let currenciesArray = [];
        const currencies = database.collection('currencies');
        const foundCurrencies = await currencies.find({});
        for await (const oneCurrency of foundCurrencies){
            currenciesArray.push(oneCurrency);
        }
        return currenciesArray;
    } catch(error) {
        console.log("Error :", error);
        return null;
    }
}

async function handleMainCurrency(res, database) {
    let currencies = await findCurrencies(database);
    if(currencies){
        let dataToSendBack = {
            currencies: currencies
        }
        res.status(200).json({res: dataToSendBack});
    } else {
        res.status(503).json({res: null});
    }
}

async function handleMainTransaction(res, database) {
    let transactions = await findTransactions(database);
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
    handleMainCurrency:handleMainCurrency,
    handleMainTransaction:handleMainTransaction
}