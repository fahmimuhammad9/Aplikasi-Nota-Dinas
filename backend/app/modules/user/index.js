'use strict';

const { CLIENT } = require('../../config/pg-config');
const { CAMEL_CASE, PAGINATION } = require('../../engine/global');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { PASSWORD_HASH } = require('../../engine/password');

const USER = {
    register: async (req, res) => {
        try {
            let PE_CHECK = await PHONE_EMAIL_CHECK(req.body.email, req.body.phone, req.body.username);
            if (PE_CHECK.success == true && PE_CHECK.errors == false) {
                return res.json({ status: 'OK', success: false, errors: true, message: PE_CHECK.message });
            }
            console.log(PE_CHECK)
            let userId = uuidv4();
            await CLIENT.query(`INSERT INTO a_user (a_user_id, created, createdby, updated, updatedby, isactive, name, username, email, phone, password) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [
                userId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                userId,
                moment(new Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                userId,
                true,
                req.body.name,
                req.body.username,
                req.body.email,
                req.body.phone,
                PASSWORD_HASH(req.body.password)
            ])
            return res.json({ status: 'OK', success: true, errors: false, message: 'Berhasil menambahkan Pengguna' })
        } catch (err) {
            return res.json({ status: 'OK', success: false, errors: true, message: err.message })
        }
    }
}

const PHONE_EMAIL_CHECK = async (email, phone, username) => {
    try {
        let results = await CLIENT.query(`SELECT COUNT(*) FROM a_user WHERE email='${email}' OR phone='${phone}' OR username='${username}'`);
        if (results.rows[0].count != 0) {
            return { success: true, errors: false, message: 'Email / Nomor HP Telah Terdaftar' }
        } else {
            return { success: false, errors: false, message: 'Boleh Mendaftar' }
        }
    } catch (err) {
        return { success: false, errors: true, message: err.message }
    }
}

module.exports = USER;