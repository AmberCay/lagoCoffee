const connection = require('../database')

function getCart(req, response) {
    let sql = "SELECT name, price, origin, description, image, class FROM coffee.item JOIN coffee.cart ON (item.id_item = cart.id_item) Where id_user = ?;"
    let answer;
    let params = [req.query.id_user]
    connection.query(sql, params, (err, res) => {
        if (err) {
            answer = { error: true, code: 200, message: "bad DB connection", data: null }
        }
        else if (res.length === 0) {
            answer = { error: true, code: 200, message: "cart empty", data: res }
        }
        else {
            answer = { error: false, code: 200, message: "cart selected", data: res }
        }
        response.send(answer)
    })
}

function addToCart(req, response) {
    let sql = "INSERT INTO coffee.cart (id_user, id_item) VALUES ('" + 
    req.body.id_user + "', '" + 
    req.body.id_item + "');";
    let answer;
    connection.query(sql, (err, res) => {
        if (err) {
            answer = { error: true, code: 200, message: "bad DB connection", data: null }
        }
        else {
            answer = { error: false, code: 200, message: String(res.insertId), data: null }
        }
    })
}

function delFromCart(req, response) {
    let params = [req.body.id_item, req.body.id_user];
    let sql = "DELETE FROM coffee.cart WHERE id_item = ? AND id_user = ?";
    let answer;
    connection.query(sql, params, (err,res) => {
        if (err) {
            answer = { error: true, code: 200, message: "bad DB connection", data: null }
        }
        else if (res.affectedRows === 1) {
            answer = { error: false, code: 200, message: String(res.affectedRows), data: null }
        }
        else {
            answer = { error: true, code: 200, message: "0", data: null }
        }
        response.send(answer)
    })
}

module.exports = {getCart, addToCart, delFromCart}