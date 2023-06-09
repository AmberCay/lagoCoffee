const mysql = require('mysql2');
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "amber160897",
    database: "coffee"
})

connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected correctly.");
    }
});

module.exports = connection