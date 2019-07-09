
require('dotenv').config();
const server = require('./server.js');

const port = process.env.PORT || 6000

server.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
});