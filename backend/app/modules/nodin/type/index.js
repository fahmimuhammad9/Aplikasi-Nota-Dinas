'use strict';

const {CLIENT} = require('../../../config/pg-config');
const {CAMEL_CASE, PAGINATION} = require('../../../engine/global');
const moment = require('moment');
const {v4:uuidv4} = require('uuid')

const NODIN_TYPE = {
    created: (req, res)=>{
        let typeId = uuidv4();
        CLIENT.query(`INSERT INTO d_nodintype(d_nodintype_id, created, createdby, updated, updatedby, isactive, name) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,[
            typeId,
            moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
            req.logged.userId,
            moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
            req.logged.userId,
            true,
            req.body.name
        ]).then(()=>{
            return res.json({status:'OK', success:true, errors:false, message: 'Berhasil Menambahkan Type'});
        }).catch((e)=>{
            return res.json({status:'OK', success:false, errors:true, message: e.message});
        })
    }, 

    findAll: async(req, res)=>{
        CLIENT.query(`
        SELECT
            dn.d_nodintype_id AS type_id,
            dn."name" 
        FROM
            d_nodintype dn
        WHERE
            dn.isactive = TRUE`).then((results)=>{
                return res.json({status:'OK', success:true, errors:false, results: CAMEL_CASE(results.rows)});
            }).catch((e)=>{
                return res.json({status:'OK', success:false, erros:true, message: e.message});
            })
    },

    deleted: async(req, res)=>{
        try{
            await CLIENT.query(`UPDATE d_nodintype SET isactive=FALSE WHERE d_nodintype_id='${req.query.nodinTypeId}'`)
            return res.json({status:'OK', success:true, errors:false, message:'Berhasil Menghapus Data'});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    }
}

module.exports = NODIN_TYPE;