// require dependencies

const express = require('express');

// define port and server

const PORT = 4050;
const server = express();

// use json parser middleware

server.use(
    express.json()
);

// initiate listening

server.listen(PORT, err => {
    console.log(`Server is running on ${PORT}`)
});