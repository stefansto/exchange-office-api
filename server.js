const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { handleLogin } = require('./controllers/login');
const { handlePutTransaction } = require('./controllers/transactionPut');
const { handleGetTransaction } = require('./controllers/transactionGet');
const { handleGetCurrencies } = require('./controllers/currenciesGet');
const { handleAddUser } = require('./controllers/addUser');
const { handleFilterTransactions } = require('./controllers/transactionFilter');

const { database } = require('./database/connection');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/currency', (_req, res) => handleGetCurrencies(res, database));

app.get('/transaction', (_req, res) => handleGetTransaction(res, database));

app.post('/login', (req, res) => handleLogin(req, res, database));

app.put('/transaction', (req, res) => handlePutTransaction(req, res, database));

app.post('/adduser', (req, res) => handleAddUser(req, res, database));

app.post('/filter', (req, res) => handleFilterTransactions(req, res, database));

app.listen(parseInt(process.env.API_PORT), () => {
    console.log('App is running on port:', parseInt(process.env.API_PORT));
});