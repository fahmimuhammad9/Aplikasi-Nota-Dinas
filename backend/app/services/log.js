'use strict';

const {CLIENT } = require('../config/pg-config');
const {v4:uuidv4} = require('uuid');
const moment = require('moment');

const INSERT_LOG = (userId, logContent, logParent) =>  {
    try{
        let logId = uuidv4();
        CLIENT.query(`INSERT INTO s_userlog(s_userlog_id, created, createdby, updated, updatedby, isactive, logs, reference)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,[
            logId,
            moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
            userId,
            moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
            userId,
            true,
            logContent,
            logParent  
        ])
        return {success:true, errors:false, message:'Logs Created'}
    }catch(err){
        return {success:false, errors:true, message: err.message}
    }
}

module.exports = {INSERT_LOG}