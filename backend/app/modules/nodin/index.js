'use strict';

const {CLIENT} = require('../../config/pg-config');
const {v4:uuidv4} = require('uuid');
const {CAMEL_CASE, PAGINATION} = require('../../engine/global');

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
                return res.json({status:'OK', success: true, errors:false, message:'Berhasil menambahkan Nota Dinas Baru'})
        }catch(err){
            return res.json({status:'OK', success:false, erros:true, message: err.message});
        }
    }
}

const CURRENT_ORGANIZATION_STEP = async (organizationId) => {
    try{
        let results = await CLIENT.query(``)
    }catch(err){
        return {success:false, errors:true, message: err.message};
    }
}

module.exports = NODIN;