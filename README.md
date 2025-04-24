## Exchange office application API

Backend meant to be used for my exchange-office-app

## Project Specification

- API made using ExpressJS
- Connection to the MongoDB
- /login route for POST requests that handles users trying to login
- /transaction route for GET requests that handles fetching data from the transaction collection
- /currency route for GET requests that handles fetching data from the currencies collection
- /transaction route for PUT requests that handles inserting data in transaction and updating data in currencies collection
- /adduser route for POST requests that handles inserting a new user into the users collection
- /filter route for POST request that handles fetching certain transaction data from the database based on the data recieved from the client

## Frontend repository

- https://github.com/stefansto/exchange-office-app

## Notes

- To start the API run 'npm start'
- Change the 'uri' const in 'server.js' to you database url
- Specify on which port the API should run in the 'port' const in 'server.js'