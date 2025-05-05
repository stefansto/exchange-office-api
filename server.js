const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { handleLogin } = require('./controllers/login');
const { handlePutTransaction } = require('./controllers/transactionPut');
const { handleGetTransaction } = require('./controllers/transactionGet');
const { handleGetCurrencies } = require('./controllers/currenciesGet');
const { handleFilterTransactions } = require('./controllers/transactionFilter');

const { handleAddUser } = require('./controllers/admin/addUser');
const { handleChangeUser } = require('./controllers/admin/changeUser');
const { handleFetchUsers } = require('./controllers/admin/fetchUsers');
const { handleActivateUser } = require('./controllers/admin/activateUser');

const { adminAuthorization } = require('./middleware/adminAuthorization');
const { cookieJwtAuth } = require('./middleware/cookieJwtAuth');
const { checkActiveStatus } = require('./middleware/checkActiveStatus');

const { database } = require('./database/connection');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({origin: true, credentials: true}));

app.post('/login', (req, res) => handleLogin(req, res, database));

app.get('/currencies', cookieJwtAuth, checkActiveStatus, (_req, res) => handleGetCurrencies(res, database));
app.get('/transactions', cookieJwtAuth, checkActiveStatus, (_req, res) => handleGetTransaction(res, database));

app.post('/transactions/filtered', cookieJwtAuth, checkActiveStatus, (req, res) => handleFilterTransactions(req, res, database));

app.put('/transactions/new', cookieJwtAuth, checkActiveStatus, (req, res) => handlePutTransaction(req, res, database));

app.post('/admin/adduser', cookieJwtAuth, checkActiveStatus, adminAuthorization, (req, res) => handleAddUser(req, res, database));
app.post('/admin/fetchusers', cookieJwtAuth, checkActiveStatus, adminAuthorization, (req, res) => handleFetchUsers(req, res, database));
app.post('/admin/changeuser', cookieJwtAuth, checkActiveStatus, adminAuthorization, (req, res) => handleChangeUser(req, res, database));
app.post('/admin/activateuser', cookieJwtAuth, checkActiveStatus, adminAuthorization, (req, res) => handleActivateUser(req, res, database));

app.listen(parseInt(process.env.API_PORT), () => {
    console.log('App is running on port:', parseInt(process.env.API_PORT));
});