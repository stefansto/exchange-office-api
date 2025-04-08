const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const uri = '';
const client = new MongoClient(uri);

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log("GET request sent for / with body: ", req.body);
    res.json("Success");
})

app.post('/login', (req, res) => {
    console.log("POST request sent for /login with body: ", req.body);
})

app.post('/transaction', (req, res) => {
    console.log("POST request sent for /transaction with body: ", req.body);
})

app.listen(port, ()=>{
    console.log('App is running on port:', port);
})