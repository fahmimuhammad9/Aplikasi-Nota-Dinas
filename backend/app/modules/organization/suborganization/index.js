'use strict';

const { CLIENT } = require('../../../config/pg-config');
const { CAMEL_CASE, PAGINATION } = require('../../../engine/global');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const SUBORGANIZATION = {
    created: async (req, res) => {
        try {
            let subId = uuidv4();
            await CLIENT.query(`INSERT INTO e_suborganization(e_suborganization_id, created, createdby, updated, updatedby, isactive, e_organization_id, name)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
                subId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                req.logged.userId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                req.logged.userId,
                true,
                req.body.organizationId,
                req.body.name
            ])
            return res.json({ status: 'OK', success: true, errors: false, message: 'Berhasil Menambahkan Sub Organisasi' });
        } catch (err) {
            return res.json({ status: 'OK', success: false, errors: true, message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            let results = await CLIENT.query(`
            select
                es.e_suborganization_id as sub_organization_id,
                es."name" as sub_organization_name,
                es.e_organization_id as organization_id,
                eo."name" as organization_name
            from
                e_suborganization es
            inner join e_organization eo on
                eo.e_organization_id = es.e_organization_id
            where
                es.isactive = true`);
            return res.json({ status: 'OK', success: true, errors: false, results: CAMEL_CASE(results.rows) })
        } catch (err) {
            return res.json({ status: 'OK', success: false, errors: true, message: err.message });
        }
    }
}

module.exports = SUBORGANIZATION;