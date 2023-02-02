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

    findAll: async (req, res) => {
        try {
            let results = await CLIENT.query(`
            SELECT
                so.s_organization_id AS organization_id,
                so."name" AS organization_name,
                so."level" AS organization_level,
                CASE
                    WHEN so.parent_id IS NULL THEN 
                    'No Parent Item'
                    ELSE (
                        SELECT
                            name
                        FROM
                            s_organization so
                        WHERE
                            so.s_organization_id = so.parent_id
                    )
                END AS organization_parent
            FROM
                    s_organization so
            WHERE
                so.isactive = TRUE`);
            return res.json({ status: 'OK', success: true, errors: false, results: CAMEL_CASE(results.rows) })
        } catch (err) {
            return res.json({ status: 'OK', sucess: false, errors: true, message: err.message });
        }
    }
}

module.exports = ORGANIZATION;