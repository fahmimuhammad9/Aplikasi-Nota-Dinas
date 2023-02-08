'use strict';

const {CLIENT} = require('../../config/pg-config');
const {v4:uuidv4} = require('uuid');
const {CAMEL_CASE, PAGINATION, VALIDATION} = require('../../engine/global');
const moment = require('moment');

const NODIN = {
    checkOrigin: async(req, res)=>{
        try{
            let results = await CLIENT.query(`
            WITH RECURSIVE org_role AS (
                SELECT
                    sr.s_role_id AS role_id,
                    sr."name" AS role_name,
                    sr."level" AS role_level,
                    sr.parent_id,
                    su.s_user_id AS user_id,
                    su."name" AS user_name,
                    so.s_organization_id AS organization_id,
                    so."name" AS organization_name
                FROM
                    s_role sr
                LEFT JOIN s_user su ON
                    su.s_role_id = sr.s_role_id
                LEFT JOIN s_organization so ON
                    so.s_organization_id = su.s_organization_id
                WHERE
                    sr.s_role_id = '${req.logged.roleId}'
            UNION ALL
                SELECT
                    sr2.s_role_id AS role_id,
                    sr2."name" AS role_name,
                    sr2."level" AS role_level,
                    sr2.parent_id,
                    su2.s_user_id AS user_id,
                    su2."name" AS user_name,
                    so2.s_organization_id AS organization_id,
                    so2."name" AS organization_name
                FROM
                    s_role sr2
                JOIN org_role orr ON
                    orr.parent_id = sr2.s_role_id
                LEFT JOIN s_user su2 ON
                    su2.s_role_id = sr2.s_role_id
                LEFT JOIN s_organization so2 ON
                    so2.s_organization_id = su2.s_organization_id
            )
            SELECT
                *
            FROM
                org_role orr
            ORDER BY
                orr.role_level ASC`)
            return res.json({status:'OK', success:true, errors:false, results: CAMEL_CASE(results.rows)});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    },

    created: async(req, res)=>{
        try{
            let nodinId = uuidv4();
            await CLIENT.query(`INSERT INTO d_nodin(d_nodin_id, created, createdby, updated, updatedby, isactive, 
                from_user_id, to_user_id, up_date, char_severity_id, urgent_severity_id, title, content, isapprove)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,[
                    nodinId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    true,
                    req.body.fromUser,
                    req.body.toUser,
                    req.body.upDate,
                    req.body.charSeverity,
                    req.body.urgentSeverity,
                    req.body.title,
                    req.body.content,
                    false
                ])
                let INPUT_APPROVA = await INSERT_APPROVAL_STEP(req.body.approval, req.logged.userId, nodinId);
                if(INPUT_APPROVA.success==false && INPUT_APPROVA.errors==true) return res.json({status:'OK', success:false, errors:true, message:INPUT_APPROVA.message});
                return res.json({status:'OK', success: true, errors:false, message:'Berhasil menambahkan Nota Dinas Baru'})
        }catch(err){
            return res.json({status:'OK', success:false, erros:true, message: err.message});
        }
    },

    findAll: async(req, res)=>{
        try{
            let results = await CLIENT.query(`
            SELECT
                dn.d_nodin_id AS nodin_id,
                dn.from_user_id ,
                (
                    SELECT
                        su."name"
                    FROM
                        s_role su
                    WHERE
                        su.s_role_id = dn.from_user_id
                ) AS from_user_role,
                (
                    SELECT 
                        so."name"
                    FROM 
                        s_user su
                    INNER JOIN s_organization so ON so.s_organization_id = su.s_organization_id
                    WHERE su.s_role_id = dn.from_user_id
                ) AS from_user_org,
                dn.nodin_number ,
                dn.up_date ,
                dn.title ,
                (
                    SELECT
                        ds."name"
                    FROM
                        d_severity ds
                    WHERE
                        ds.d_severity_id = dn.char_severity_id
                ) AS char_severity_name,
                (
                    SELECT
                        ds2."name"
                    FROM
                        d_severity ds2
                    WHERE
                        ds2.d_severity_id = dn.urgent_severity_id
                )AS urgent_severity_name,
                dn.isapprove ,
                CASE
                    WHEN dn.isapprove = FALSE THEN 'On Progress'
                    ELSE 'Done'
                END AS status
            FROM
                d_nodin dn
            WHERE
                dn.isactive = TRUE`);
            Promise.all(
                results.rows.map(async(val)=>{
                    val.approval_status = await (await CHECK_APPROVAL_STATUS(val.nodin_id)).results.status
                    return val
                })
            ).then((data)=>{
                return res.json({status:'OK', success:true, errors:false, results: CAMEL_CASE(data)});
            })
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    },
    uploadAttachment: async(req, res)=>{

    }
}

const CHECK_APPROVAL_STATUS = async(nodinId) =>{ 
    try{
        let results = await CLIENT.query(`
        SELECT
            CASE
                WHEN a.count > b.count THEN 'On Progress Approval' 
                ELSE 'Finished Progress' END AS status  
            FROM
                (
                    SELECT
                        count(*)
                    FROM
                        d_nodinapproval dn
                    WHERE
                        dn.isapprove = FALSE
                        AND dn.d_nodin_id = '${nodinId}'
                ) AS a,
                (
                    SELECT
                        count(*)
                    FROM
                        d_nodinapproval dn
                    WHERE
                        dn.isapprove = TRUE
                        AND dn.d_nodin_id = '${nodinId}'
                )AS b`)
                return {success:true, errors:false, results: CAMEL_CASE(results.rows[0])};
    } catch(err){
        return {success:false, errors:true, message: err.message};
    }
}

const INSERT_APPROVAL_STEP = async(approval, userCreated, nodinId) => {
    try{
        approval.map(async(val)=>{
            let approvalId = uuidv4();
            await CLIENT.query(`INSERT INTO d_nodinapproval(d_nodinapproval_id, created, createdby, updated, updatedby, isactive,
                d_nodin_id, s_user_id, review, isapprove) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,[
                    approvalId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    userCreated,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    userCreated,
                    true,
                    nodinId, 
                    val.userId,
                    '',
                    userCreated == val.userId ? true : false
                ])
        })
        return {success:true, errors:false, message:'Berhasil'};
    }catch(err){
        return {success:false, errors:true, message:err.message};
    }
}

module.exports = NODIN;