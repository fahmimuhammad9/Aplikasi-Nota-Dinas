'use strict';

const { CLIENT } = require('../../config/pg-config');
const { CAMEL_CASE } = require('../../engine/global');
const {v4:uuidv4} = require('uuid');
const moment = require('moment');

const DASHBOARD = {
    statusDashboard: async(req, res)=>{
        try{
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    },

    nodinDashboard: async(req, res)=>{
        try{
            let results = await CLIENT.query(`
            SELECT
                a.count AS total_draft,
                b.count AS total_document,
                c.count AS total_done,
                d.count AS total_tagged
            FROM
                (
                    SELECT
                        count(*)
                    FROM
                        d_nodin dn
                    WHERE
                        dn.isactive = TRUE
                        AND dn.d_nodintype_id = '7a39d940-f3c3-4414-8306-18aa04eaece6'
                ) AS a,
                (
                    SELECT
                        count(*)
                    FROM
                        d_nodin dn
                    WHERE
                        dn.isactive = TRUE
                        AND dn.d_nodintype_id = '2971dc40-23f7-4f04-90ab-a4b6b531a1e7'
                ) AS b,
                (
                    SELECT
                        count(*)
                    FROM
                        d_nodin dn
                    WHERE
                        dn.isactive = TRUE
                        AND dn.isapprove = TRUE
                ) AS c,
                (
                    SELECT
                        count(*)
                    FROM
                        d_nodinapproval dn
                    WHERE
                        dn.s_user_id = '${req.logged.userId}'
                ) AS d`)
            return res.json({status:'OK', success:true, errors:false, results: CAMEL_CASE(results.rows[0])});
        }catch(err){
            return res.json({status:'OK', success:false, erros:true, message: err.message});
        }
    }


}

module.exports = DASHBOARD;