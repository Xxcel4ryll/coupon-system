const express = require('express');
const app = express();
const http = require('http');

const mountHttp = require('./helpers/mount-http');

const httpServer = http.createServer(app);

mountHttp(app);

module.exports = httpServer;