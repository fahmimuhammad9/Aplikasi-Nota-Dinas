'use strict';

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const API_ROUTER = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const USER = require('../modules/user');
const SECURITY = require('../security');
const USER_ROLES = require('../modules/user/roles');
const ROLES = require('../modules/organization/roles');
const ORGANIZATION = require('../modules/organization');
const NODIN = require('../modules/nodin');
const TYPE = require('../modules/type');
const PRINT = require('../modules/print');

dotenv.config();

API_ROUTER.route('/view').get(PRINT.test);

API_ROUTER.route('/register').post(USER.register);
API_ROUTER.route('/login').post(SECURITY.login);

API_ROUTER.route('/roles').post(SECURITY.verify, USER_ROLES.created);
API_ROUTER.route('/roles').get(SECURITY.verify, USER_ROLES.findAll);

API_ROUTER.route('/organization').post(SECURITY.verify, ORGANIZATION.created);
API_ROUTER.route('/organization').get(SECURITY.verify, ORGANIZATION.findAll);

API_ROUTER.route('/organization/roles').post(SECURITY.verify, ROLES.created);
API_ROUTER.route('/organization/roles').get(SECURITY.verify, ROLES.findAll);

API_ROUTER.route('/nodin/origin').get(SECURITY.verify, NODIN.checkOrigin);
API_ROUTER.route('/nodin/severity').get(SECURITY.verify, TYPE.findAll);
API_ROUTER.route('/nodin/severity').post(SECURITY.verify, TYPE.created);

API_ROUTER.route('/printtest').get(SECURITY.verify, PRINT.created);
API_ROUTER.route('/printpup').get(SECURITY.verify, PRINT.createdPup);

module.exports = API_ROUTER
