const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const cTable = require('console.table');

// creates connection to database
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'employee_db'
});

