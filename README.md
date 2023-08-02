# Employee Tracker

## Description

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. This is a command-line application that manages a company's employee database, using Node.js, Inquirer, and MySQL.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Installation

To install this command-line application, you'll need to install dependencies for Inquirer, MySql, and Console Table. You can install each of these by running npm i @ inquirer 8.2.4, and npm console.table, and by installling the up-to-date driver for MySql that can be found through this link: https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/. After inquiring each of these, you'll need to make sure to import them into an index.js file to be able to use them in the command line. 

## Usage 

To make use of the database in MySql, you'll need to navigate into the db file and run mysql -u root -p and enter the password you have created for MySql. Next, you'll need to source the schema.sql file in order to create the database and source the seeds.sql file in order to prepopulate the database with employee information. Make sure to run 'use employee_db' to utilize the tables within the database. After exiting out of the MySql shell, navigate back to the index.js file and open it in either an integrated terminal or in your machine's native terminal. Finally, run the command "node index.js" in order to start the Employee Tracker application. 
