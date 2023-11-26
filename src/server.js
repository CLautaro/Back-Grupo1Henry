const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

const server = express();
server.use(express.json());

server.use(router);

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(router);

module.exports = server;
