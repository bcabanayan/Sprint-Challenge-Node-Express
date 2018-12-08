// require dependencies

const express = require('express');

// require routers

const projectsRouter = require('./projectsRouter.js');

// define port and server

const PORT = 4050;
const server = express();

// use json parser middleware

server.use(express.json());

// use routers

server.use('/projects', projectsRouter)

// initiate listening

server.listen(PORT, err => {
    console.log(`Server is running on ${PORT}`)
});