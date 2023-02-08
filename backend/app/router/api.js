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

const NODIN_ATTACHMENT_STORAGES = multer.diskStorage({
    destination: (req, file, callback)=>{
        let pathfile
        switch (file.mimetype) {
            case 'image/jpeg' || 'image/jpg' || 'image/png':
                pathfile = 'images';
                break;
            case 'pdf' || 'doc' || 'xlsx':
                pathfile = 'document';
                break;
            default:
                break;
        }
        let directory = `${process.env.UPLOAD_PATH}/attachment/${pathfile}`;
        fs.mkdirSync(`${directory}`, {recursive: true});
        
        callback(null, directory);
    },
    filename: async(req, file, callback)=>{
        callback(null, file.fieldname + '-' + Date.now() + '-' + uuidv4() + path.extname(file.originalname));
    }
})

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

API_ROUTER.route('/nodin').post(SECURITY.verify, NODIN.created);
API_ROUTER.route('/nodin').get(SECURITY.verify, NODIN.findAll);
API_ROUTER.route('/nodin/attachment').post(SECURITY.verify, multer({storage: NODIN_ATTACHMENT_STORAGES, limits: process.env.FILES_SIZE}).single('files'), NODIN.uploadAttachment);

API_ROUTER.route('/printtest').get(SECURITY.verify, PRINT.created);
API_ROUTER.route('/printpup').get(SECURITY.verify, PRINT.createdPup);

module.exports = API_ROUTER
