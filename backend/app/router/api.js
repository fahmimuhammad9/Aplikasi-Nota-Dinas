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
const NODIN_TYPE = require('../modules/nodin/type');
const DASHBOARD = require('../modules/dashboard');
const NODIN_CODE = require('../modules/nodin/code');

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


API_ROUTER.route('/user').get(SECURITY.verify, USER.findAll);
API_ROUTER.route('/user').post(SECURITY.verify, USER.registerv2);
API_ROUTER.route('/user').delete(SECURITY.verify, USER.deleted);
API_ROUTER.route('/user/detail').get(SECURITY.verify, USER.findById);

API_ROUTER.route('/roles').post(SECURITY.verify, USER_ROLES.created);
API_ROUTER.route('/roles').get(SECURITY.verify, USER_ROLES.findAll);

API_ROUTER.route('/dashboard/nodin').get(SECURITY.verify, DASHBOARD.nodinDashboard);

API_ROUTER.route('/organization').post(SECURITY.verify, ORGANIZATION.created);
API_ROUTER.route('/organization').get(SECURITY.verify, ORGANIZATION.findAll);
API_ROUTER.route('/organization/detail').get(SECURITY.verify, ORGANIZATION.findById);
API_ROUTER.route('/organization/division').get(SECURITY.verify, ORGANIZATION.divitionChart);    

API_ROUTER.route('/organization/roles').post(SECURITY.verify, ROLES.created);
API_ROUTER.route('/organization/roles').get(SECURITY.verify, ROLES.findAll);

API_ROUTER.route('/nodin/type').post(SECURITY.verify, NODIN_TYPE.created);
API_ROUTER.route('/nodin/type').get(SECURITY.verify, NODIN_TYPE.findAll);
API_ROUTER.route('/nodin/type').delete(SECURITY.verify, NODIN_TYPE.deleted);

API_ROUTER.route('/nodin/code').get(SECURITY.verify, NODIN_CODE.findAll);
API_ROUTER.route('/nodin/code').post(SECURITY.verify, NODIN_CODE.created);
API_ROUTER.route('/nodin/code').delete(SECURITY.verify, NODIN_CODE.deleted);

API_ROUTER.route('/nodin/approval').get(SECURITY.verify, NODIN.stepApproval);

API_ROUTER.route('/nodin/origin').get(SECURITY.verify, NODIN.checkOrigin);
API_ROUTER.route('/nodin/detail').get(SECURITY.verify, NODIN.findById);
API_ROUTER.route('/nodin/severity').get(SECURITY.verify, TYPE.findAll);
API_ROUTER.route('/nodin/severity').post(SECURITY.verify, TYPE.created);

API_ROUTER.route('/nodin').post(SECURITY.verify, NODIN.created);
API_ROUTER.route('/nodin').get(SECURITY.verify, NODIN.findAll);
API_ROUTER.route('/nodin/draft').get(SECURITY.verify, NODIN.myDraft);
API_ROUTER.route('/nodin/attachment').post(SECURITY.verify, multer({storage: NODIN_ATTACHMENT_STORAGES, limits: process.env.FILES_SIZE}).single('files'), NODIN.uploadAttachment);

API_ROUTER.route('/printtest').get(SECURITY.verify, PRINT.created);
API_ROUTER.route('/printpup').get(SECURITY.verify, PRINT.createdPup);

module.exports = API_ROUTER
