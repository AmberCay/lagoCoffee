const connection = require('../database');

function getStart(req, res) {
    let answer = { error: false, code: 200, message: "Starting point" }
    res.send(answer)
}

function getCoffee(req, response) {
    let sql = "SELECT * FROM coffee.coffee WHERE class = 'coffee';";
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
    let sql = "SELECT * FROM tea.coffee WHERE class = 'tea';";
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

// update get item to fit new db

function getItem(req, response) {
    console.log(req.query);
    let answer
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

// To the post function you must add a class for posting wither coffee or tea

function postCoffee(req, response) {
    let sql = "INSERT INTO coffee.coffee (name, price, origin, description, image) VALUE ('" + 
    req.body.name + ", " + 
    req.body.price + ", " + 
    req.body.origin + ", " + 
    req.body.description + ", " + 
    req.body.image + ");";
    let answer;
    connection.query(sql, (err,res) => {
        if (err) {
            answer = { error: true, code: 200, message: "bad DB connection", data: null }
        }
        else {
            answer = { error: false, code: 200, message: String(res.insertId), data: null }
        }
    })
}

function postTea(req, response) {
    let sql = "INSERT INTO tea.coffee (name, price, origin, description, image) VALUE ('" + 
    req.body.name + ", " + 
    req.body.price + ", " + 
    req.body.origin + ", " + 
    req.body.description + ", " + 
    req.body.image + ");";
    let answer
    connection.query(sql, (err,res) => {
        if (err) {
            answer = { error: true, code: 200, message: "bad DB connection", data: null }
        }
        else {
            answer = { error: false, code: 200, message: String(res.insertId), data: null }
        }
    })
}

function putCoffee(req, response) {
    let params = [
        req.body.name,
        req.body.price,
        req.body.origin,
        req.body.description,
        req.body.image,
        req.body.coffee_id
    ]
    let sql = "UPDATE coffee.coffee SET name = COALESCE(?, name), COALESCE(?, price), COALESCE(?, origin), COALESCE(?, description), COALESCE(?, image) WHERE (coffee_id = ?);";
    let answer;
    connection.query(sql, params, (err, res) => {
        console.log(res);
        if (err) {
            answer = { error: true, code: 200, message: "bad DB connection", data: null }
        } 
        else if (res.affectedRows != 0 ) {
            answer = { error: false, code: 200, message: String(res.affectedRows), data: null }
        }
        else {
            answer = { error: true, code: 200, message: "0", data: null};
        }
        response.send(answer)
    })
}

function putTea(req, response) {
    let params = [
        req.body.name,
        req.body.price,
        req.body.origin,
        req.body.description,
        req.body.image,
        req.body.tea_id
    ]
    let sql = "UPDATE tea.coffee SET name = COALESCE(?, name), COALESCE(?, price), COALESCE(?, origin), COALESCE(?, description), COALESCE(?, image) WHERE (coffee_id = ?);";
    let answer;
    connection.query(sql, params, (err, res) => {
        console.log(res);
        if (err) {
            answer = { error: true, code: 200, message: "bad DB connection", data: null }
        } 
        else if (res.affectedRows != 0 ) {
            answer = { error: false, code: 200, message: String(res.affectedRows), data: null }
        }
        else {
            answer = { error: true, code: 200, message: "0", data: null};
        }
        response.send(answer)
    })
}

function deleteCoffee (req, response) {
    let params = [req.body.coffee_id];
    let sql = "DELETE FROM coffee.coffee WHERE coffee_id = ?";
    let answer;
    connection.query(sql, params, (err, res) => {
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

function deleteTea (req, response) {
    let params = [req.body.tea_id];
    let sql = "DELETE FROM tea.coffee WHERE tea_id = ?";
    let answer;
    connection.query(sql, params, (err, res) => {
        if (err) {
            answer = { error: true, code: 200, message: "bad DB connection", data: null }
        }
        else if (res.affectedRows === 1) {
            answer = { error: false, code: 200, message: String(res.affectedRows), data: null }
        }
        else {
            answer = { error: true, code: 200, message: "0", data: null }
        }
    })
}

module.exports = { getStart, getCoffee, getTea, getItem, postCoffee, postTea, putCoffee, deleteCoffee, deleteTea }