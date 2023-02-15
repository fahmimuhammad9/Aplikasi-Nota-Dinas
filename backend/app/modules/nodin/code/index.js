'use strict'

const {CLIENT} = require('../../../config/pg-config');
const {v4:uuidv4} = require('uuid');
const moment = require('moment');
const { CAMEL_CASE } = require('../../../engine/global');

const NODIN_CODE = {
    created: async(req, res)=>{
        try{
            let codeId = uuidv4();
            await CLIENT.query(`INSERT INTO d_orgcode (d_orgcode_id, created, createdby, updated, updatedby, isactive,
                code, name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[
                    codeId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    true,
                    req.body.code,
                    req.body.name
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
    },
    bindAll: async(req, res)=>{
        try{
            let results = await CLIENT.query(`
            SELECT
                do2.d_orgcoderole_id AS orgcoderole_id,
                do2.d_orgcode_id AS org_code_id,
                do3.code AS org_code_code,
                do2.s_user_id AS user_id,
                su."name" AS user_name
            FROM
                d_orgcoderole do2
            INNER JOIN d_orgcode do3 ON
                do3.d_orgcode_id = do2.d_orgcode_id
            INNER JOIN s_user su ON
                su.s_user_id = do2.s_user_id
            WHERE
                do2.isactive = TRUE
                AND su.isactive = TRUE
                AND do3.isactive = TRUE`);
            return res.json({status:'OK', success:true, errors:false, results: CAMEL_CASE(results.rows)});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true,message: err.message});
        }
    },
    bindCreated: async(req, res)=>{
        try{
            let bindId = uuidv4();
            await CLIENT.query(`INSERT INTO d_orgcoderole(d_orgcoderole_id, created, createdby, updated, updatedby, isactive,
                d_orgcode_id, s_user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[
                    bindId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    true,
                    req.body.orgCodeId,
                    req.body.userId
                ])
            return res.json({status:'OK', success:true, errors:false, message:'Berhasil Membinding Data'});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    },
    bindDeleted: async(req, res)=>{
        try{
            await CLIENT.query(`DELETE FROM d_orgcoderole WHERE d_orgcoderole_id='${req.query.bindId}'`);
            return res.json({status:'OK', success:true, errors:false, message:'Berhasil menghapus Data'});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    }
}

module.exports = NODIN_CODE