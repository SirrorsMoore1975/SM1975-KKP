const setupServer = require('./server');
const PORT = process.env.PORT || 4000; // process.env will assign you a port
const server = setupServer();