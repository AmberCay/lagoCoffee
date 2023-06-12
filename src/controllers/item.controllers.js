const connection = require('../database');

function getStart(req, res) {
    let answer = { error: false, code: 200, message: "Starting point" }
    res.send(answer)
}

function getCoffee(req, response) {
    let sql = "SELECT * FROM coffee.coffee;";
    let answer;
    connection.query(sql, (err, res) => {
        if (err) {
            answer = { error: true, code: 200, message: "bad DB connection", data: null }
        }
        else {
            answer = { error: false, code: 200, message: "list of coffees", data: res }
        }
        response.send(answer)
    })
}

function getTea(req, response) {
    let sql = "SELECT * FROM tea.coffee;";
    let answer;
    connection.query(sql, (err, res) => {
        if (err) {
            answer = { error: true, code: 200, message: "bad DB connection", data: null }
        }
        else {
            answer = { error: false, code: 200, message: "list of teas", data: res }
        }
        response.send(answer)
    })
}

function getItem(req, response) {
    console.log(req.query);
    if (req.query.tea_id != null) {
        let params = [req.query.tea_id]
        let sql = "SELECT * FROM tea.coffee WHERE tea_id = ?"
        connection.query(sql, params, (err, res) => {
            if (err) {
                answer = { error: true, code: 200, message: "bad DB connection", data: null }
            }
            else {
                answer = { error: false, code: 200, message: "tea selected", data: res }
            }
            response.send(answer)
        })
    }
    else {
        let params = [req.query.coffee_id]
        let sql = "SELECT * FROM coffee.coffee WHERE coffee_id = ?"
        connection.query(sql, params, (err, res) => {
            if (err) {
                answer = { error: true, code: 200, message: "bad DB connection", data: null }
            }
            else {
                answer = { error: false, code: 200, message: "coffee selected", data: res }
            }
            response.send(answer)
        })
    }
}

// Amber you silly goose, code a put, post and delete function even if only the store owner would ahve access to it

function postCoffee(req, response) {
    let sql = "INSERT INTO coffee.coffee (name, price, origin, description, image) VALUE ('" + req.body.name +", " + ");"
}

module.exports = { getStart, getCoffee, getTea, getItem}