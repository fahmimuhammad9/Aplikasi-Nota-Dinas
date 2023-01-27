'use strict';

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const API_ROUTER = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const USER = require('../modules/user');

dotenv.config();

API_ROUTER.route('/register').post(USER.register);

module.exports = API_ROUTER
