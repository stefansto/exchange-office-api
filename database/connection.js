const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL);
const database = client.db('exchange');

module.exports = {
    client: client,
    database: database
}