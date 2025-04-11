const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const login = require('./controllers/login');
const transaction = require('./controllers/transaction');
const main = require('./controllers/main');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const database = client.db('exchange');

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log("GET request sent for /");
    main.handleMain(res, database);
});

app.post('/login', (req, res) => {
    console.log("POST request sent for /login with body: ", req.body);
    login.handleLogin(req, res, database);
});

app.put('/transaction', (req, res) => {
    console.log("PUT request sent for /transaction with body: ", req.body);
    transaction.handleTransaction(req, res, database);
});

app.listen(port, ()=>{
    console.log('App is running on port:', port);
});