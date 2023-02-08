'use strict';

const {CLIENT} = require('../../config/pg-config');
const {CAMEL_CASE, PAGINATION} = require('../../engine/global');
const moment = require('moment');
const {v4:uuidv4} = require('uuid')

const TYPE = {
    created: async(req, res)=>{
        try{
            let typeId = uuidv4();
            await CLIENT.query(`INSERT INTO d_severity(d_severity_id, created, createdby, updated, updatedby, isactive, 
                name, level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[
                    typeId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    true,
                    req.body.name,
                    req.body.level
                ])
                return res.json({status:'OK', success:true, errors:false, message:'Berhasil menambahkan Severity'})
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message})
        }
    },

    findAll: async(req, res)=>{
        try{
            let results = await CLIENT.query(`
            SELECT
                ds.d_severity_id AS severity_id,
                ds."name" AS severity_name,
                ds."level" AS severity_level
            FROM
                d_severity ds
            WHERE
                ds.isactive = TRUE
            ORDER BY
                  ds."level" DESC`);
            return res.json({status:'OK', success:true, errors:false, results: CAMEL_CASE(results.rows)});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    },

    findById: async(req, res)=>{

    }
}

module.exports = TYPE