const findCurrency = async (database, currencyName) => {
    try {
        let foundCurrency = null;
        const currencies = database.collection('currencies');
        const query = { name: currencyName };
        foundCurrency = await currencies.findOne(query);
        return await foundCurrency;
    } catch(error) {
        console.log("Error :", error);
        return null;
    }
}

const handlePutTransaction = async (req, res, database) => {
    console.log("PUT request sent for /transaction with body: ", req.body);
    
    let insertData = {
        type: req.body.type,
        date: req.body.date,
        cashier: req.body.cashier,
        currencyIn: null,
        currencyInAmmount: null,
        currencyOut: null,
        currencyOutAmmount: null,
        rate: req.body.rate
    }

    try {
        const currencyColl = database.collection('currencies');
        const transactionColl = database.collection('transactions');
        
        if(req.body.currencyOut){
            let currency = await findCurrency(database, req.body.currencyOut);
            if(await currency.ammount < req.body.currencyOutAmmount){
                throw 'Not enough ammount';
            }
            await currencyColl.findOneAndUpdate(
                {name: req.body.currencyOut },
                {$inc: { ammount: (-1 * req.body.currencyOutAmmount) }}
            );
            insertData.currencyOut = req.body.currencyOut;
            insertData.currencyOutAmmount = req.body.currencyOutAmmount;
        }

        if(req.body.currencyIn){
            await currencyColl.findOneAndUpdate(
                {name: req.body.currencyIn },
                {$inc: { ammount: req.body.currencyInAmmount }}
            );
            insertData.currencyIn = req.body.currencyIn;
            insertData.currencyInAmmount = req.body.currencyInAmmount;
        }
        
        await transactionColl.insertOne(insertData);
        await res.status(200).json({message:'Success'});
    } catch (error) {
        console.log('Error: ', error);
        res.status(400).json({message:'Error'});
    }
}

module.exports = {
    handlePutTransaction: handlePutTransaction
}