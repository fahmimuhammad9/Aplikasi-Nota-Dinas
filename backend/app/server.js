'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const compress = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const useragent = require('express-useragent');
const rfs = require('rotating-file-stream');
const moment = require('moment');
const momentTz = require('moment-timezone');
const dotenv = require('dotenv');

// const HEAlTH_ROUTER = require('./router/health');
const API_ROUTER = require('./router/api');

moment.locale('id');
moment.tz.setDefault('Asia/Jakarta');

const accessLogStream = rfs.createStream("app.log", {
    interval: "1d",
    path: path.join(__dirname, '../logs'),
});

dotenv.config()
const app = express()

app.use((req, res, next) => {
    res.header('X-App-Name', 'APP-NODIN');
    res.header('X-Powered-By', 'PT. Pesonna Optima Jasa');
    next();
});

app.use(cors());
app.use(compress());
app.use(useragent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': false }));
app.use(morgan('combined', { stream: accessLogStream }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.options('*', (req, res) => {
    return res.json({ status: 'OK' })
});

app.use('/v1', API_ROUTER);

app.use((req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.stack = "Not Found";
    res.json({ status: err.status, message: err.stack });
    next(err);
});

module.exports = app;