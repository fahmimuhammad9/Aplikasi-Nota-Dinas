'use strict';

const { CLIENT } = require('../../../config/pg-config');
const { CAMEL_CASE, PAGINATION } = require('../../../engine/global');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');


const USER_ROLES = {
    created: async (req, res) => {
        try {
            let rolesId = uuidv4();
            await CLIENT.query('INSERT INTO a_roles(a_roles_id, created, createdby, updated, updatedby, isactive, name) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
                rolesId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                req.logged.userId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                req.logged.userId,
                true,
                req.body.name
            ])
            return res.json({ status: 'OK', sucess: true, errors: false, message: 'Berhasil menambahkan Roles' });
        } catch (err) {
            return res.json({ status: 'OK', sucess: false, errors: true, message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            let results = await CLIENT.query(`
            select
                ar.a_roles_id as roles_id,
                ar."name" as roles_name
            from
                a_roles ar
            where
                ar.isactive = true`);
            return res.json({ status: 'OK', sucess: true, errors: false, results: CAMEL_CASE(results.rows) })
        } catch (err) {
            return res.json({ status: 'OK', sucess: false, errors: true, message: err.message });
        }
    }
}

module.exports = USER_ROLES;