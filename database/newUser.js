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

const adduser = async () => {
    let username = null;
    let password = null;

    console.log('Inserting a new user');
    username = await askQuestion('Username?');
    password = await askQuestion('Password?');
    role = await askQuestion('Role? (1-admin/2-user)');

    rl.close();

    if(role === '1'){
        role = 'admin';
    } else if(role === '2'){
        role = 'user';
    } else {
        console.log('Invalid role!');
        return;
    }

    if(!username || !password){
        console.log('Input error!');
    } else {
        try {
            const hashedPassword = await hashPassword(password).then(res => {return res});
            const users = database.collection('users');
            const query = {
                username: username,
                password: hashedPassword,
                active: true,
                date: new Date(),
                role: role
            }
            const result = await users.insertOne(query);
            result.acknowledged ? console.log(`Log in with ${query.username}/${password}`) : console.log('Failed to add user, please try again by running \'npm run user\'')
        } catch(e) {
            console.log('Error: ', e);
        } finally {
            client.close();
        }
    }
}

adduser();