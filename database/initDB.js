const { database, client } = require('./connection');
const readline = require('node:readline');
const { hashPassword } = require('../utils/passHashing');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        })
    })
}

const initDatabase = async() => {
    let username = null;
    let password = null;

    console.log('Inserting a new admin');
    username = await askQuestion('Username?');
    password = await askQuestion('Password?');

    rl.close();

    if(!username || !password){
        console.log('Error');
    } else {
        try {
            const hashedPassword = await hashPassword(password).then(res => {return res});
            const users = database.collection('users');
            const query = {
                username: username,
                password: hashedPassword,
                active: true,
                date: new Date(),
                role: 'admin'
            }
            const result = await users.insertOne(query);
            result.acknowledged ? console.log(`Log in with ${query.username}/${password}`) : null;
        } catch(e) {
            console.log('Error: ', e);
        }
        try {
            const currencies = database.collection('currencies');
            const query = [
                {
                    name: 'EUR',
                    img: 'eur.jpg',
                    ammount: 0,
                },
                {
                    name: 'USD',
                    img: 'usd.jpg',
                    ammount: 0,
                },
                {
                    name: 'RSD',
                    img: 'rsd.jpg',
                    ammount: 0,
                },
                {
                    name: 'GBP',
                    img: 'gbp.jpg',
                    ammount: 0,
                }
            ];
            (await currencies.insertMany(query)).acknowledged ? console.log('Inserted currencies') : null;
        } catch(e) {
            console.log('Error: ', e);
        }

        try {
            const users = database.collection('users');
            await users.createIndex({ 'username': 1 }, { unique: true });
        } catch(e) {
            console.log('Error: ', e);
        } finally {
            client.close();
        }
    }
}

initDatabase();