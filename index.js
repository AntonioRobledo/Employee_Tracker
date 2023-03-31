const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'tDxeVkqky12@@',
    database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

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
    db.query("SELECT id, name FROM department", (err, response) => {
        if(err) { console.log(err);
        }
        const roleList = response.map((response) => {
            return {
                value: response.id,
                name: response.name
            };
        });

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
            type: 'list',
            name: 'department_id',
            message: 'Which department does this role belong to?: ',
            choices: roleList
        },
    ]).then(response => {
        db.query('INSERT INTO role SET ?', response, (err) => {
            err ? console.log(err) : console.log('A new role has been added.')
            init();
        })
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
            type: 'input',
            name: 'manager_id',
            message: "Enter employee's manager's ID: "
        }
    ]).then(response => {
        db.query('INSERT INTO employee SET ?', response, (err) => {
        err ? console.log(err) : console.log('A new employee has been added.')

        init();
        })
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
    db.query("SELECT employee.id, CONCAT(employee.first_name,' ', employee.last_name) AS name, role.title FROM employee JOIN role ON employee.id = role.id",
     (err, response) => {
        if(err) { console.log(err);
        }
        const employeeList = response.map((response) => ({
                name: response.name,
                value: response.id
        }));
        db.query("SELECT title, id FROM role", 
        (err, response) => {
            if (err) {console.log(err);
            }
            const newRole = response.map((response) => ({
                    name: response.title,
                    value: response.id
            }));
            db.query("SELECT first_name, id FROM employee",
            (err, response) => {
            if (err) {console.log(err);
            }
            const managerList = response.map((response) => ({
                    name: response.first_name,
                    value: response.id
            }));
        
    inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: "Which employee's role would you like to update?",
            choices: employeeList
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What role would you like to assign them?',
            choices: newRole
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Who is the employee's manager?",
            choices: managerList
        }
    ]).then((response => {
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [response.role_id, response.id], err => {
            if(err) {console.log(err)}
        })
        db.query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [response.manager_id, response.id], err => {
            if(err) {console.log(err)}
        })
        console.log("Employee's info has been updated. Please check console table for changes.")
        init();
                    }
                ))       
            })
        })
    })
}

init();
