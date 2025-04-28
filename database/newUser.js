const { database, client } = require('./connection');
const readline = require('node:readline');

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

    username = await askQuestion('Username?');
    password = await askQuestion('Password?');
    rl.close();

    if(!username || !password){
        console.log('Input error!');
    } else {
        try {
            const users = database.collection('users');
            const query = {
                username: username,
                password: require('crypto').createHash('md5').update(password).digest('hex'),
                active: true,
                date: new Date()
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