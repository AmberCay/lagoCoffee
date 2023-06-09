const connection = require('../database');

function getStart(req, res) {
    let answer = {error: false, code: 200, message: "Starting point"}
    res.send(answer)
}

function getCoffee(req, response) {
    let sql = "SELECT * FROM coffee.coffee;";
    let answer;
    connection.query(sql, (err, res) => {
        if (err) {
            answer = {error: true, code: 200, message: "bad DB connection", data: null}
        }
        else {
            answer = {error: false, code: 200, message: "list of coffees", data: res}
        }
        response.send(answer)
    })
}

module.exports = {getStart, getCoffee}