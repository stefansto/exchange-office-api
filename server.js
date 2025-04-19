const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const login = require('./controllers/login');
const transactionPut = require('./controllers/transactionPut');
const transactionGet = require('./controllers/transactionGet');
const currenciesGet = require('./controllers/currenciesGet');
const addUser = require('./controllers/addUser');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const database = client.db('exchange');

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/currency', (req, res) => {
    console.log("GET request sent for /currency");
    currenciesGet.handleGetCurrencies(res, database);
});

app.get('/transaction', (req, res) => {
    console.log("GET request sent for /transaction");
    transactionGet.handleGetTransaction(res, database);
});

app.post('/login', (req, res) => {
    console.log("POST request sent for /login with body: ", req.body);
    login.handleLogin(req, res, database, crypto);
});

app.put('/transaction', (req, res) => {
    console.log("PUT request sent for /transaction with body: ", req.body);
    transactionPut.handlePutTransaction(req, res, database);
});

app.post('/adduser', (req, res) => {
    console.log("POST request sent for /adduser with body: ", req.body);
    if(req.body.authorized){
        addUser.addUser(req, res, database, crypto);
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
})

app.listen(port, ()=>{
    console.log('App is running on port:', port);
});