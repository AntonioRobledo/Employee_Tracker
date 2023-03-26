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
            'Add Department' 
        ]
    }
]).then(response => {
    console.log(response)
    switch(response.init) {
        case 'View All Employess':
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
    }
})

const viewAllEmployees = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'viewEmployees',
            message: 
            
        }
    ])
}