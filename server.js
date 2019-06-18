const express = require('express');
const server = express();
const postRouter = require('./posts/posts-router.js');

server.use(express.json());
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.send('<h1>Blog API</h1>')
})

module.exports = server;