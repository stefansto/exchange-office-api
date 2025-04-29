## Exchange office application API

Backend meant to be used for my exchange-office-app

## Project Specification

- API made using ExpressJS
- Connection to the MongoDB
- /login route for POST requests that handles users trying to login
- /transactions route for GET requests that handles fetching data from the transaction collection
- /currencies route for GET requests that handles fetching data from the currencies collection
- /transactions/new route for PUT requests that handles inserting data in transaction and updating data in currencies collection
- /adduser route for POST requests that handles inserting a new user into the users collection
- /transactions/filtered route for POST request that handles fetching certain transaction data from the database based on the data recieved from the client
- Use of jsonwebtoken for authentication when trying to access certain routes
- Database initialization from the terminal
- Inserting a new user from the terminal

## Frontend repository

- https://github.com/stefansto/exchange-office-app

## Usage

- Clone the repository and run `npm install`
- Make a `.env` file (example file of it is provided) in root containing variables:
    - `MONGO_URL` for your MongoDB url
    - `API_PORT` to specify on which port should the API run
    - `JWT_SECRET` to hold a secret string to use for jsonwebtoken
- Have your MongoDB running and initialize data in it by running `npm run database` in the terminal, this will prompt you to add your first user and setup currency data
- To add a new user in the database run `npm run user` in the terminal
- To start the API run `npm start`