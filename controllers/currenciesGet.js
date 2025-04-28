const findCurrencies = async (database) => {
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

const handleGetCurrencies = async (res, database) => {
    console.log("GET request sent for /currency");
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

module.exports = {
    handleGetCurrencies:handleGetCurrencies
}