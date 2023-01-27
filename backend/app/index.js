"use strict";

const server = require('./server')
const dotenv = require('dotenv')
const http = require('http');

dotenv.config();

http.createServer(server).listen(`${process.env.APP_PORT}`, `${process.env.APP_HOST}`, () => {
    console.log(`Rest-API Nodin Started on ${process.env.APP_HOST} PORT ${process.env.APP_PORT}`);
});
