/*const { resolve } = require("path/posix");*/

USE employeetracker_db;

/* Insert into department */
INSERT INTO department (name) 
VALUES 
("Sales"),
("Engineer"),
("Finance"),
("Legal");

/* Insert into role */
INSERT INTO role 
(title, salary, department_id) VALUES
("Sales Lead", 35000, 1),
("Salesperson", 20000, 1),
("Accountant", 45000, 3),
("Lawyer", 55000, 4),
("Software Engineer", 50000, 2),
("Legal Team Lead", 47000, 4),
("Lead Engineer", 45000, 2);

/* Insert into employee */
INSERT INTO employee
(first_name, last_name, role_id, manager_id) VALUES
("John", "Norris", 3, null),
("Sally", "Jordan", 1, 1),
("Tom", "Jones", 2, 2),
("Daniel", "Porter", 4, 6),
("Joshua", "Marshall", 5, 7),
("Thomas", "Alvarez", 6, null),
("Melissa", "Edwards", 7, null),
("Sabrina", "Mills", 5, 7);