'use strict';

const { CLIENT } = require('../../config/pg-config');
const { CAMEL_CASE } = require('../../engine/global');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const ORGANIZATION = {
    created: async (req, res) => {
        try {
            let organizationId = uuidv4();
            await CLIENT.query(`INSERT INTO s_organization(s_organization_id, created, createdby, updated, updatedby, isactive, name, level, parent_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
                organizationId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                req.logged.userId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                req.logged.userId,
                true,
                req.body.name,
                req.body.level,
                req.body.parentId
            ])
            return res.json({ status: 'OK', sucess: true, errors: false, message: 'Berhasil Menambahkan Organisasi' });
        } catch (err) {
            return res.json({ status: 'OK', sucess: false, errors: true, message: err.message });
        }
    },

    divitionChart: async(req, res)=>{
        try{
            let results = await CLIENT.query(`
            SELECT
                CASE
                    WHEN so.parent_id IS NOT NULL THEN (
                        SELECT
                            so2.s_organization_id
                        FROM
                            s_organization so2
                        WHERE
                            so2.s_organization_id = so.parent_id
                    )
                    ELSE NULL
                END AS parent_id,
                so.s_organization_id as org_id
            FROM
                    s_organization so
            WHERE
                so.parent_id IS NOT NULL
            ORDER BY
                so."level" DESC`);
            let org = await CLIENT.query(`
            SELECT
                so.s_organization_id AS id, 
                concat(sr."name" , ' ', so."name") AS title,
                su."name" AS "name",
                so.parent_id AS parent_id
            FROM
                s_organization so
            LEFT JOIN s_user su
            ON 
                su.s_organization_id = so.s_organization_id
            LEFT JOIN s_role sr ON
                sr.s_role_id = su.s_role_id
            ORDER BY
                so."level" DESC,
                sr."level" DESC`);
            return res.json({status:'OK', success:true, errors:false, results: CAMEL_CASE(org.rows), step: CAMEL_CASE(results.rows)});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    },

    findAll: async (req, res) => {
        try {
            let results = await CLIENT.query(`
            SELECT
                so.s_organization_id AS organization_id,
                so."name" AS organization_name,
                so."level" AS organization_level,
                CASE
                    WHEN so.parent_id IS NULL THEN 
                    'No Parent Organization'
                    ELSE (
                        SELECT
                            so2.name
                        FROM
                            s_organization so2
                        WHERE
                            so2.s_organization_id = so.parent_id
                    )
                END AS organization_parent
            FROM
                    s_organization so
            WHERE
                so.isactive = TRUE
                ORDER BY so."level" DESC `);
            return res.json({ status: 'OK', success: true, errors: false, results: CAMEL_CASE(results.rows) })
        } catch (err) {
            return res.json({ status: 'OK', sucess: false, errors: true, message: err.message });
        }
    },

    findById: async(req, res)=>{
        try{
            let results = await CLIENT.query(`
            WITH RECURSIVE org_par AS (
                SELECT
                    so.s_organization_id AS org_id,
                    so."name" AS org_name,
                    so."level" AS org_level,    
                    so.parent_id AS parent_id
                FROM
                    s_organization so
                WHERE
                    so.s_organization_id = '${req.query.organizationId}'
            UNION ALL
                SELECT
                    so2.s_organization_id AS org_id,
                    so2."name" AS org_name,
                    so2."level" AS org_level,
                    so2.parent_id AS parent_id
                FROM
                    s_organization so2
                JOIN org_par orp ON
                    orp.parent_id = so2.s_organization_id
            )
            SELECT
                *
            FROM
                org_par orp
            ORDER BY
                orp.org_level DESC`);
            let current = results.rows.pop();
            let team = await CLIENT.query(`
            SELECT
                su.s_user_id AS user_id,
                su."name" AS user_name,
                sr."name" AS role_name
            FROM
                s_user su
            INNER JOIN s_role sr ON
                sr.s_role_id = su.s_role_id
            WHERE
                s_organization_id = '${req.query.organizationId}'
            ORDER BY
                sr."level" DESC`);
            current.parent = results.rows;
            current.team = team.rows;   
            return res.json({status:'OK', success:true, errors:false, results: CAMEL_CASE(current)});
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    }
}

module.exports = ORGANIZATION;