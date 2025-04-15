const handleTransaction = async (req, res, database) => {
    
    let insertData = {
        type: req.body.type,
        date: new Date(),
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
        
        if(req.body.currencyIn){
            await currencyColl.findOneAndUpdate(
                {name: req.body.currencyIn },
                {$inc: { ammount: req.body.currencyInAmmount }}
            );
            insertData.currencyIn = req.body.currencyIn;
            insertData.currencyInAmmount = req.body.currencyInAmmount;
        }
        
        if(req.body.currencyOut){
            await currencyColl.findOneAndUpdate(
                {name: req.body.currencyOut },
                {$inc: { ammount: (-1 * req.body.currencyOutAmmount * req.body.rate) }}
            );
            insertData.currencyOut = req.body.currencyOut;
            insertData.currencyOutAmmount = req.body.currencyOutAmmount;
        }
        
        await transactionColl.insertOne(insertData);

        await res.status(200).json({message:'Success'});
    } catch (error) {
        console.log('Error: ', error);
        res.status(400).json({message:'Error'});
    }
}

module.exports = {
    handleTransaction: handleTransaction
}