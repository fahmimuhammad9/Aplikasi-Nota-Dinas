'use strict'

const {CLIENT} = require('../../../config/pg-config');
const {v4:uuidv4} = require('uuid');
const moment = require('moment');
const { CAMEL_CASE } = require('../../../engine/global');

const NODIN_CODE = {
    created: async(req, res)=>{
        try{
            let codeId = uuidv4();
            await CLIENT.query(`INSERT INTO d_orgcode (d_orgcode_id, created, createdby, updated, updatedby, isactive
                code, name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[
                    codeId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    true,
                    req.body.code,
                    req.body.message
                ])
            return res.json({status:'OK', success: true, errors:false, message:'Berhasil Menambahkan Kode'});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    },
    findAll: async(req, res)=>{
        try{
            let results = await CLIENT.query(`
            SELECT
                do2.d_orgcode_id AS oc_id,
                do2.code AS oc_code,
                do2."name" AS oc_name
            FROM
                d_orgcode do2
            WHERE
                do2.isactive = TRUE`);
            return res.json({status:'OK', success:true, errors:false, results: CAMEL_CASE(results.rows)});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    },
    deleted: async(req, res)=>{
        try{
            await CLIENT.query(`UPDATE d_orgcode SET isactive=FALSE WHERE d_orgcode_id='${req.query.codeId}'`);
            return res.json({status:'OK', success:true, errors:false, message:'Berhasil menghapus Kode Surat'});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    }
}

module.exports = NODIN_CODE