'use strict';

const { CLIENT } = require('../../config/pg-config');
const { CAMEL_CASE, PAGINATION, PREFIX_PHONE_NUMBER } = require('../../engine/global');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { PASSWORD_HASH } = require('../../engine/password');
const fs = require('fs');
const csv = require('csv-parser');

const USER = {
    csvRegister: async(req, res)=>{
        try{
            fs.createReadStream(req.file)
            .pipe(csv())
            .on('data',(data)=>{
                CLIENT.query(``)
            })
        }catch(err){
            return res.json({status:'OK', success:false, errors: true, message: err.message});  
        }
    },
    register: async (req, res) => {
        try {
            let PE_CHECK = await PHONE_EMAIL_CHECK(req.body.email, req.body.phone, req.body.username);
            if (PE_CHECK.success == true && PE_CHECK.errors == false) {
                return res.json({ status: 'OK', success: false, errors: true, message: PE_CHECK.message });
            }
            let userId = uuidv4();
            await CLIENT.query(`INSERT INTO s_user (s_user_id, created, createdby, updated, updatedby, isactive, 
                username, name, email, phone, password, s_role_id, s_organization_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`, [
                userId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                userId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                userId,
                true,
                req.body.username,
                req.body.name,
                req.body.email,
                PREFIX_PHONE_NUMBER(req.body.phone),
                PASSWORD_HASH(req.body.password),
                req.body.roleId,
                req.body.organzationId
            ])
            return res.json({ status: 'OK', success: true, errors: false, message: 'Berhasil Menambahkan Pengguna' })
        } catch (err) {
            return res.json({ status: 'OK', success: false, errors: true, message: err.message })
        }
    },

    deleted: async(req, res)=>{
        try{
            await CLIENT.query(`UPDATE s_user SET isactive=FALSE WHERE s_user_id='${req.query.userId}'`);
            return res.json({status:'OK', success:true, errors:false, message: 'Berhasil Menghapus Pengguna'});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    },

    registerv2: async(req, res)=>{
        try{
            let userId = uuidv4();
            await CLIENT.query(`INSERT INTO s_user (s_user_id, created, createdby, updated, updatedby, isactive, 
                username, name, email, phone, password, s_role_id, s_organization_id) VALUES ($1, $2, $3, $4, $5, $6, 
                    $7, $8, $9, $10, $11, $12, $13)`,[
                        userId,
                        moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                        req.logged.userId,
                        moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                        req.logged.userId,
                        true,
                        req.body.username,
                        req.body.name,
                        req.body.email,
                        PREFIX_PHONE_NUMBER(req.body.phone),
                        PASSWORD_HASH(req.body.password),
                        req.body.roleId,
                        req.body.organizationId
                    ])
            return res.json({status:'OK', success:true, errors:false, message: 'Berhasil Menambahkan Pengguna'});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    },

    findAll: (req, res)=>{
        CLIENT.query(`
        SELECT
            su.s_user_id AS user_id,
            su.username AS user_username,
            su."name" AS user_name,
            su.email AS user_email,
            su.phone AS user_phone,
            su.s_role_id AS role_id,
            sr."name" AS role_name,
            su.s_organization_id AS organization_id,
            so."name" AS organization_name
        FROM
            s_user su
        INNER JOIN s_role sr ON
            sr.s_role_id = su.s_role_id
        INNER JOIN s_organization so ON
            so.s_organization_id = su.s_organization_id
        WHERE
            su.isactive = TRUE`).then((results)=>{
                return res.json({status:'OK', success:true, errors:false, results: CAMEL_CASE(results.rows)});
            }).catch((e)=>{
                return res.json({status:'OK', success:false, errors:true, message: e.message});
            })
    },
    
    findById: async(req, res)=>{
        try{
            let results = await CLIENT.query(`
            SELECT
                su.s_user_id AS user_id,
                su.created AS created_at,
                (
                    SELECT
                        name
                    FROM
                        s_user su2
                    WHERE
                        su2.s_user_id = su.createdby
                )AS created_by,
                su.updated AS updated_at,
                (
                    SELECT
                        name
                    FROM
                        s_user su2
                    WHERE
                        su2.s_user_id = su.updatedby
                ) AS updated_by,
                su.username AS user_username,
                su."name" AS user_name,
                su.email AS user_emai,
                su.phone AS user_phone,
                sr."name" AS role_name,
                sr."level" AS role_level,
                so."name" AS org_name,
                so."level" AS org_level
            FROM
                s_user su
            INNER JOIN s_role sr ON
                sr.s_role_id = su.s_role_id
            INNER JOIN s_organization so ON
                so.s_organization_id = su.s_organization_id
            WHERE
                su.s_user_id = '${req.query.userId}'`);
            let personalInfo = results.rows[0];
            return res.json({status:'OK', success:true, errors:false, results: CAMEL_CASE(personalInfo)});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    }
}

const PHONE_EMAIL_CHECK = async (email, phone, username) => {
    try {
        let results = await CLIENT.query(`SELECT COUNT(*) FROM s_user WHERE email='${email}' OR phone='${phone}' OR username='${username}'`);
        if (results.rows[0].count != 0) {
            return { success: true, errors: false, message: 'Email / Nomor HP Telah Terdaftar' }
        } else {
            return { success: false, errors: false, message: 'Boleh Mendaftar' }
        }
    } catch (err) {
        return { success: false, errors: true, message: err.message }
    }
}

module.exports = USER;