INSERT INTO department (id, name)
VALUES (1, 'Sales'),
       (2, 'Engineering'),
       (3, 'Finance'),
       (4, 'Legal');

INSERT INTO role (id, title, department_id, salary)
VALUES (1, 'Sales Lead', 1, 100000), 
       (2, 'Sales Associate', 1, 80000), 
       (3, 'Lead Engineer', 2, 150000),
       (4, 'Software Engineer', 2, 120000),
       (5, 'Account Manager', 3, 160000),
       (6, 'Accountant', 3, 125000),
       (7, 'Legal Team Lead', 4, 250000),
       (8, 'Lawyer', 4, 210000);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Luke', 'Skywalker', 1, NULL),
       (2, 'Han', 'Solo', 2, 1),
       (3, 'Ben', 'Kenobi', 3, NULL),
       (4, 'Darth', 'Vader', 4, 3),
       (5, 'Leia', 'Organa', 5, NULL),
       (6, 'Poe', 'Dameron', 6, 5),
       (7, 'Padme', 'Amidala', 7, NULL),
       (8, 'Lando', 'Calrissian', 8, 7);
