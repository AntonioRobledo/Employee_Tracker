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
            console.log('Have a nice day!');
            break;
         }
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department you would like to create: '
        }
    ]).then(response => {
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
            name: 'title',
            message: 'Enter the name of the role you would like to create: '
        },
        {
            type: 'input',
            name:'salary',
            message: 'Enter the salary of this role: '
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department number this role should be under: '
        },
    ]).then(response => {
        db.query('INSERT INTO role SET ?', response, (err) => {
            err ? console.log(err) : console.log('A new role has been added.')
            init();
        })
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Enter the employee's first name: "
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Enter the employee's last name: "
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Enter the employee's role ID: "
        },
        {
            type: 'list',
            name: 'isManager',
            message: "Is the employee a manager?",
            choices: ['yes', 'no']
        }
    ]).then(response => {
        if(response.isManager === 'yes') {
            delete response.isManager
            db.query('INSERT INTO employee SET ?', response, err => {
            err ? console.log(err) : console.log('A new manager has been added.')
            })
            init();
        } else if (response.isManager === 'no') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'manager_id',
                    message: "Enter the employee's manager's ID: "
                }
            ]).then(result => {
                delete response.isManager
                let newEmployee = {
                ...response,
                ...result
                }
                db.query('INSERT INTO employee SET ?', newEmployee, err => {
                    if(err) {console.log(err)}
                })
            })
            console.log('A new employee has been added.')
            init();
        }
    })
}

const viewAllDepartments = () => {
    db.query('SELECT * FROM department', (err, department) => {
        (err) ? console.log(err) : console.table(department)
        init();
    })
}

const viewAllRoles = () => {
    db.query('SELECT * FROM role', (err, role) => {
        (err) ? console.log(err) : console.table(role)
        init();
    })
}

const viewAllEmployees = () => {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id", (err, employee) => {
        (err) ? console.log(err) : console.table(employee)
        init();
    })
}

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the ID of the employee you would like to update: '
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role of the employee you would like to update to?'
        }
    ]).then(response => {
        let updatedRole = {
            role_id: response.role_id
        }
        db.query(`UPDATE employee SET ? WHERE id = ${response.id}`, updatedRole, err => {
            if(err) {console.log(err)}
        })
        console.log("Employee's info has been updated. Please check console table for changes.")
        init();
    })
}

init();
