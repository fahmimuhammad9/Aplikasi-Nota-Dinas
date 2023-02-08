'use strict';

const { CLIENT } = require('../../../config/pg-config');
const { CAMEL_CASE, PAGINATION } = require('../../../engine/global');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const ROLES = {
    created: async (req, res) => {
        try {
            let rolesId = uuidv4();
            await CLIENT.query(`INSERT INTO s_userrole(s_userrole_id, created, createdby, updated, updatedby,  isactive, 
                name) VALUES ($1, $2, $3, $4, $5, $6, $7)`,[
                    rolesId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    req.logged.userId,
                    true,
                    req.body.name
                ])
            return res.json({ status: 'OK', success: true, errors: false, message: 'Berhasil Roles Pengguna' });
        } catch (err) {
            return res.json({ status: 'OK', success: false, errors: true, message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            let results = await CLIENT.query(`
            SELECT
                su.s_userrole_id AS user_role_id,
                su."name" AS user_role_name
            FROM
                s_userrole su
            WHERE
                su.isactive = TRUE`);
            return res.json({ status: 'OK', success: true, errors: false, results: CAMEL_CASE(results.rows) })
        } catch (err) {
            return res.json({ status: 'OK', success: false, errors: true, message: err.message });
        }
    }
}

module.exports = ROLES;