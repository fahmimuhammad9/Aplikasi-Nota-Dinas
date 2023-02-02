'use strict';

const { CLIENT } = require('../../../config/pg-config');
const { CAMEL_CASE, PAGINATION } = require('../../../engine/global');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');


const USER_ROLES = {
    created: async (req, res) => {
        try {
            let rolesId = uuidv4();
            await CLIENT.query(`INSERT INTO s_role(s_role_id, created, createdby, updated, updatedby, isactive, name, level)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
                rolesId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                req.logged.userId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                req.logged.userId,
                true,
                req.body.name,
                req.body.level
            ])
            return res.json({ status: 'OK', sucess: true, errors: false, message: 'Berhasil menambahkan Roles' });
        } catch (err) {
            return res.json({ status: 'OK', sucess: false, errors: true, message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            let results = await CLIENT.query(`
            SELECT
                sr.s_role_id AS role_id,
                sr."name" AS role_name,
                sr."level" AS role_level
            FROM
                s_role sr
            WHERE
                sr.isactive = TRUE`);
            return res.json({ status: 'OK', sucess: true, errors: false, results: CAMEL_CASE(results.rows) })
        } catch (err) {
            return res.json({ status: 'OK', sucess: false, errors: true, message: err.message });
        }
    }
}

module.exports = USER_ROLES;