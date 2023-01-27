"use strict";

const { CLIENT } = require('../config/pg-config');
const { CAMEL_CASE } = require('../engine/global');
const { AUTH_LOGIN, VERIFY_AUTH } = require('../services/auth');

const SECURITY = {
    login: async (req, res) => {
        try {
            let login = await AUTH_LOGIN(req);
            if (login.success === true && login.errors === false) {
                req.headers.authorization = `Bearer ${login.token}`;
                let auth = await VERIFY_AUTH(req);
                if (auth.success === true && auth.errors === false) {
                    let roles = await CLIENT.query(`
                    SELECT
                        pr.s_user_id AS user_id,
                        pr.pa_permission_id AS permission_id,
                        pp."name" as roles
                    FROM
                        pa_roles pr
                    LEFT JOIN pa_permission pp ON
                        pp.pa_permission_id = pr.pa_permission_id 
                    WHERE
                        pr.isactive = TRUE
                        AND pr.s_user_id = '${auth.results.userId}'`);
                    if (roles.rowCount > 0) {
                        res.json({ status: 'OK', success: true, errors: false, token: login.token, roles: roles.rows[0].roles });
                    } else {
                        res.json({ status: 'OK', success: false, errors: true, message: 'Invalid Credential' });
                    }
                } else {
                    res.json({ status: 'OK', success: false, errors: true, message: auth.message });
                }
            } else {
                res.json({ status: 'OK', success: false, errors: true, message: login.message });
            }
        } catch (err) {
            res.json({ status: 'OK', success: false, errors: true, message: err.message });
        }
    },

    verify: async (req, res, next) => {
        try {
            let auth = await VERIFY_AUTH(req);
            if (auth.success === true && auth.errors === false) {
                CLIENT.query(`
                    SELECT 
                        kp.s_user_id as user_id,
                        kp.k_partner_id as partner_id
                    FROM k_partner kp
                    WHERE kp.isactive=true AND
                        kp.k_partner_id='${auth.results.partnerId}' AND
                        kp.s_user_id='${auth.results.userId}'`
                ).then((results) => {
                    if (results.rows.length > 0) {
                        req.logged = CAMEL_CASE(results.rows[0]);
                        next()
                    } else {
                        res.json({ status: 'OK', success: false, errors: true, message: 'Izin ditolak' });
                    }
                }).catch((err) => {
                    res.json({ status: 'OK', success: false, errors: true, message: err.message });
                });
            } else {
                return res.json({ status: 'OK', success: false, message: 'Unauthorized' });
            }
        } catch (err) {
            return res.json({ status: 'OK', success: false, message: err.message });
        };
    },

    verifyPassword: async (req, res) => {
        try {

        } catch (err) {
            return res.json({ status: 'OK', success: false, message: err.message });
        }
    },

    forgotPassword: async (req, res) => {
        try {

        } catch (err) {
            return res.json({ status: 200, success: false, message: err.message });
        }
    }
}

module.exports = SECURITY;