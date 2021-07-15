//Dependencies
const mysql = require ('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: '',
    database: 'employeetrack_db',
  });
  
  connection.connect(function (error) {
      if (error) throw error;
      console.log("Connected as id " + connection.threadId + "\n");
      menu();
  })
  function menu() {
      inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'menuChoice',
        choices: ['Add Employee', 'Add department', 'Add role', 'View Employees', 'View departments', 'View Roles', 'Update Employee Role', 'Exit'],
      }).then(answers => {
          switch (answers.menuChoice) {
              case "Add Employee":
                  addEmployee()
                  break;
            case "Add department":
                addDepartment()
                break;
            case "Add role":
                addRole()
                break;
            case "View Employees":
                viewEmployees()
                break;
            case "View departments":
                viewDepartments()
                break;
            case "View Roles":
                viewRoles()
                break;
            case "Update Employee Role":
                updateEmployeeRole()
                break;
            case "Exit":
                break;
            default:
                connection.end()
                break;
          }
      })
  }

function addEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "first_name",
        message: "Employees First Name?"
    },
    {
        type: "input",
        name: "last_name",
        message: "Employess last name?"
    },
    {
        type: "number",
        name: "role_id",
        message: "Employees role id?"
    },
    {
        type: "number",
        name: "manager_id",
        message: "Employees manager's ID?"
    }
]).then(function(res) {
    connection.query('INSERT INTO  employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)' [res.first_name, res.last.name, res.role_id, res.manager_id], function (err, data) {
        if (error) throw error;
        console.table("Inserted!")
        menu();
    })
})

}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What department would you like to add?"
    }, 
]).then(function(res) {
    connection.query("INSERT INTO department (name) VALUES (?)", [res.department], function(error, data) {
        if (error) throw error;
        console.table("Inserted");
        menu();
    })
})
}

function addRole() {
    inquirer.prompt([
        {
            message: "Role Name",
            type: "input",
            name: "title"
    },
    {
        message: "Salary",
        type: "number",
        name: "salary"
    },
    {
        message: "Department ID:",
        type: "number",
        name: "department_id"
    }
]).then(function(response) {
    connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (error, data) {
        if (error) throw error;
        console.table(data);
    })
    menu();
})
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (error, data) {
        if (error) throw error;
        console.table(data);
        menu();
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (error, data) {
        if (error) throw error;
        console.table(data);
        menu();
    })
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (error, data) {
        if (error) throw error;
        console.table(data);
        menu();
    })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "What is the first name of the employee you would like to update?",
            type: "input",
            name: "first_name"
        }, 
        {
            message: "What is the last name of the employee you would like to update?",
            type: "input",
            name: "last_name"
        },
        {
            message: "Enter the new role id: ",
            type: "number",
            name: "role_id"
        }
    ]).then(function(response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?", [response.role_id, response.first_name, response.last_name], function(error,data) {
            if (error) throw error;
            console.table(data);
        })
    })
    menu();
}