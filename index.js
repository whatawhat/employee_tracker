//Dependencies
const mysql = require ('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: '',
    database: 'employeetrack_db',
  });
  
  connection.connect(function (err) {
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

  



