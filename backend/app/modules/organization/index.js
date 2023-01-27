'use strict';

const { CLIENT } = require('../../config/pg-config');
const { CAMEL_CASE } = require('../../engine/global');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const ORGANIZATION = {
    created: async (req, res) => {
        try {
            let organizationId = uuidv4();
            await CLIENT.query(`INSERT INTO e_organization (e_organization_id, created, createdby, updated, updatedby, isactive, name) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
                organizationId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                req.logged.userId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                req.logged.userId,
                true,
                req.body.name
            ])
            return res.json({ status: 'OK', sucess: true, errors: false, message: 'Berhasil Menambahkan Organisasi' });
        } catch (err) {
            return res.json({ status: 'OK', sucess: false, errors: true, message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            let results = await CLIENT.query(`
            select
                eo.e_organization_id as organization_id,
                eo."name" as organization_name
            from
                e_organization eo
            where
                eo.isactive = true`);
            return res.json({ status: 'OK', success: true, errors: false, results: CAMEL_CASE(results.rows) })
        } catch (err) {
            return res.json({ status: 'OK', sucess: false, errors: true, message: err.message });
        }
    }
}

module.exports = ORGANIZATION;