'use strict';

const { CLIENT } = require('../../../config/pg-config');
const { CAMEL_CASE, PAGINATION } = require('../../../engine/global');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const LEVEL = {
    created: async (req, res) => {
        try {
            let levelId = uuidv4();
            await CLIENT.query(`INSERT INTO e_level(e_level_id, created, createdby, updated, updatedby, isactive, level, name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
                levelId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                req.logged.userId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                req.logged.userId,
                true,
                parseInt(req.body.level),
                req.body.name
            ])
            return res.json({ status: 'OK', success: true, errors: false, message: 'Berhasil Menambahkan Level Koordinasi' });
        } catch (err) {
            return res.json({ status: 'OK', success: false, errors: true, message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            let results = await CLIENT.query(`
            select
                el.e_level_id as level_id,
                el."level" as level_value,
                el."name" as level_name
            from
                e_level el
            where
                el.isactive = true
            order by 
                el."level" asc`);
            return res.json({ status: 'OK', success: true, errors: false, results: CAMEL_CASE(results.rows) })
        } catch (err) {
            return res.json({ status: 'OK', success: false, errors: true, message: err.message });
        }
    }
}

module.exports = LEVEL;