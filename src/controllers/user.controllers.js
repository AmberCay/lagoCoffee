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