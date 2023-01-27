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
const LEVEL = require('../modules/organization/level');
const ORGANIZATION = require('../modules/organization');
const SUBORGANIZATION = require('../modules/organization/suborganization');

dotenv.config();

API_ROUTER.route('/register').post(USER.register);
API_ROUTER.route('/login').post(SECURITY.login);

API_ROUTER.route('/roles').post(SECURITY.verify, USER_ROLES.created);
API_ROUTER.route('/roles').get(SECURITY.verify, USER_ROLES.findAll);

API_ROUTER.route('/organization').post(SECURITY.verify, ORGANIZATION.created);
API_ROUTER.route('/organization').get(SECURITY.verify, ORGANIZATION.findAll);

API_ROUTER.route('/organization/sub').post(SECURITY.verify, SUBORGANIZATION.created);
API_ROUTER.route('/organization/sub').get(SECURITY.verify, SUBORGANIZATION.findAll);

API_ROUTER.route('/organization/level').post(SECURITY.verify, LEVEL.created);
API_ROUTER.route('/organization/level').get(SECURITY.verify, LEVEL.findAll);
module.exports = API_ROUTER
