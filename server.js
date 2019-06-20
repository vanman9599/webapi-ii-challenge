const express = require('express');
const helmet = require('helmet');
const server = express();
const postRouter = require('./posts/posts-router.js');

server.use(helmet());
server.use(express.json());
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.send('<h1>Blog API</h1>')
})

module.exports = server;