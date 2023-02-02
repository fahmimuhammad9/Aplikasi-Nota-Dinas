"use strict";

const { CLIENT } = require('../config/pg-config');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const { CAMEL_CASE, VALIDATION } = require('../engine/global');
const { VALID_PASSWORD } = require('../engine/password');

const SECURITY = {
    login: async (req, res) => {
        try {
            if (VALIDATION({ 'username': req.body.username, 'password': req.body.password }) === false) {
                CLIENT.query(`
                select
                    su.s_user_id as user_id,
                    su."password" as user_password,
                    su.s_role_id as role_id
                from
                    s_user su
                where
                    su.username = '${req.body.username}'
                    and su.isactive = true
                limit 1`).then((results) => {
                    if (results.rows.length > 0) {
                        let checkPassword = VALID_PASSWORD(req.body.password, results.rows[0].user_password);
                        if (checkPassword === true) {
                            let token = jwt.sign({ userId: results.rows[0].user_id }, process.env.JWT_SECRET)
                            res.json({ status: 'OK', success: true, errors: false, token: token })
                        } else {
                            res.json({ status: 'OK', success: false, errors: true, message: 'Kata Sandi Tidak Valid' })
                        }
                    } else {
                        res.json({ status: 'OK', success: false, errors: true, message: 'Pengguna Tidak Ditemukan' });
                    }
                }).catch((e) => {
                    return res.json({ status: 'OK', success: false, errors: true, message: e.message })
                })
            } else {
                return res.json({ status: 'OK', success: false, errors: true, message: 'Silahkan Masukkan Username dan Kata Sandi Anda' })
            }
        } catch (err) {
            res.json({ status: 'OK', success: false, errors: true, message: err.message });
        }
    },

    verify: async (req, res, next) => {
        try {
            let token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
                CLIENT.query(`
                select
                    su.s_user_id as user_id,
                    su."name" as user_name,
                    su.email as user_email,
                    su.s_role_id as role_id
                from
                    s_user su
                where
                    su.s_user_id  = '${decode.userId}'`).then((results) => {
                    if (results.rows.length > 0) {
                        req.logged = CAMEL_CASE(results.rows[0]);
                        next();
                    }
                }).catch((e) => {
                    res.json({ status: 'OK', success: false, errors: true, message: e.message });
                });
            });
        } catch (err) {
            return res.json({ status: 'OK', success: false, message: err.message });
        };
    },
}

module.exports = SECURITY;