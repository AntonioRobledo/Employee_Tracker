const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// creates connection to database
const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'tDxeVkqky12@@',
    database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

// inquirer prompts user with choices
const init = () => {
inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'init',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments', 
            'Add Department',
            'Exit'
        ]
    }
]).then(response => {
    console.log(response)
    switch(response.init) {
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Exit':
            break;
         }
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the name of the department you would like to create: '
        }
    ]).then(response => {
        console.log(response)
        db.query('INSERT INTO department SET ?', response, (err) => {
            err ? console.log(err) : console.log('A new department has been added.')
            init(); 
        })
    })
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Enter the name of the role you would like to create: '
        }
    ]).then(response {
        console.log(response)
        db.query('INSERT INTO role SET ?', response, (err) => {
            err ? console.log(err) : console.log(' A new role has been added.')
            init();
        })
    })
}

init();
