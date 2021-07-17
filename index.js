//Dependencies
const mysql = require ('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'Peacejoy@82',
    database: 'employeetracker_db',
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
                connection.end()
          }
      })
  }

function addEmployee() {
    connection.query("SELECT * FROM role", function (error, data) {
        if (error) throw error;
        console.log(data);
        var roleChoice = data.map(role => ({
            value:role.id,
            name:role.title,
        }))
    connection.query("SELECT * FROM employee", function (error, data) {
        if (error) throw error;
        console.log(data);
        var employeeChoice = data.map(employee => ({
            value:employee.id,
            name:employee.first_name + " " + employee.last_name,
            value: '',
            name:"none",
        }))
   
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
        type: "list",
        name: "role_id",
        message: "Employees role id?",
        choices: roleChoice
    },
    {
        type: "list",
        name: "manager_id",
        message: "Employees manager's ID?",
        choices: employeeChoice
    }
]).then(function(res) {
    console.log(res)
    connection.query('INSERT INTO  employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)' [res.first_name, res.last.name, res.role_id, res.manager_id], function (err, data) {
        if (error) throw error;
        console.table("Inserted!")
        menu();
    })
})
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
    connection.query("SELECT * FROM department", function(error, data) {
        if (error) throw error;
        console.log(data);
        var choicesdepartment = data.map(department => ({
            value:department.id,
            name:department.name,
        }))
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
        message: "What is the department",
        type: "list",
        choices: choicesdepartment,
        name: "department_id"
    }
]).then(function(response) {
    console.log(response);
    connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (error, data) {
        if (error) throw error;
        console.log("New Role Created!");
        menu();
    })
})
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
    connection.query("SELECT * FROM employee", function (error, data) {
        if (error) throw error;
        console.log(data);
        var employeeSelect = data.map(employee => ({
            value:employee.id,
            name:employee.first_name + " " + employee.last_name,
    }))
    connection.query("SELECT * FROM role", function (error, data) {
        if (error) throw error;
        console.log(data);
        var roleSelect = data.map(role => ({
            value:role.id,
            name:role.title,
        }))
    inquirer.prompt([
        {
            type: "list",
            message: "Which Employee would you like to update?",
            name: "employee_name",
            choices: employeeSelect
        }, 
        {
            type: "list",
            message: "What role would you like to assign?",
            name: "role_id",
            choices:roleSelect
        }
    ]).then(function(response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?", [response.employee_name, response.role.id], function(error,data) {
            if (error) throw error;
            console.table(data);
        })
    })
})
})
    menu();
}
