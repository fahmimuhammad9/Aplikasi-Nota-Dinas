'use strict';

const {CLIENT} = require('../../config/pg-config');
const moment = require('moment');
const {CAMEL_CASE, PAGINATION} = require('../../engine/global');
const {v4:uuidv4} = require('uuid');

const REFERENCE = {
    created: async(req, res)=>{
        try{
            let referenceId = uuidv4();
            await CLIENT.query(`INSERT INTO s_reference(s_reference_id, created, createdby, updated, updatedby, isactive,
                name, alias, value) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,[
                    referenceId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    true,
                    req.body.name,
                    req.body.alias,
                    req.body.value
                ])
            return res.json({status:'OK', success:true, errors:false, message:'Berhasil Menambahkan Referensi'});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    },

    findAll: async(req, res)=>{
        try{
            let results = await CLIENT.query(`
            SELECT
                sr.s_reference_id AS reference_id,
                sr."name" AS reference_name,
                sr.alias AS reference_alias,
                sr.value AS reference_value
            FROM
                s_reference sr
            WHERE
                sr.isactive = TRUE`)
            return res.json({status:'OK', success:true, errors:false, results: CAMEL_CASE(results.rows)});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    }
}

module.exports = REFERENCE;