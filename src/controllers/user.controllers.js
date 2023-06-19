const connection =  require('../database')
const CryptoJS = require("crypto-js")

function postUserLogin (req, response) {
    let answer;
    let email = req.body.email;
    let password = req.body.password;

    let params = [email, password];
    let sql = 'SELECT * FROM user.coffee WHERE email = ? and password = ?';

    connection.query(sql, params, (err, res) => {
        if (err) {
            answer = { error: true, code: 200, message: "bad DB connection", data: null }
        }
        else if (res.length > 0) {
            answer = { error: false, code: 200, message: "user logged in", data: res }
        }
    })
}

function postUserRegister (req, response) {
    let answer;
    let email = req.body.email;
    let password = req.body.password;

    let sqlCheckEmail = "SELECT COUNT(*) as count FROM user WHERE email='" + email +"'";
    connection.query(sqlCheckEmail, (err, res) => {
        if (err) {
            answer = { error: true, code: 200, message: "bad DB connection", data: null }
        }
        else if (res[0].count > 0) {
            answer = { error: true, code: 200, message: "user email already used", data: res }
        }
        else {
            let sql = "INSERT INTO user (email, name, password)" + "VALUES ('" +
            email + "', '" +
            req.body.name + "', '" +
            password + "')";

            connection.query(sql, (err, res) => {
                if (err) {
                    answer = { error: true, code: 200, message: "bad DB connection", data: null }
                }
                else {
                    answer = { error: false, code: 200, message: String(res.insertId), data: res }
                }
            })
        }
    })
}

module.exports = { postUserLogin, postUserRegister }