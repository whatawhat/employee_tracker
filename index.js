//Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "stephanie",
  database: "employeetracker_db",
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("Connected as id " + connection.threadId + "\n");
  menu();
});
function menu() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "menuChoice",
      choices: [
        "Add Employee",
        "Add department",
        "Add role",
        "View Employees",
        "View departments",
        "View Roles",
        "Update Employee Role",
        "Delete Employee",
        "Delete Department",
        "Delete Role",
        "Exit",
      ],
    })
    .then((answers) => {
      switch (answers.menuChoice) {
        case "Add Employee":
          addEmployee();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "View departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Delete Employee":
            deleteEmployee();
            break;
        case "Delete Department":
            deleteDepartment();
            break;
        case "Delete Role":
            deleteRole();
            break;
        case "Exit":
          connection.end();
      }
    });
}

//Add employees
function addEmployee() {
  connection.query("SELECT * FROM role", function (error, data) {
    if (error) throw error;
    //console.log(data);
    var roleChoice = data.map((role) => ({
      value: role.id,
      name: role.title,
    }));
    connection.query("SELECT * FROM employee", function (error, data) {
      if (error) throw error;
      //console.log(data);
      var employeeChoice = data.map((employee) => ({
        value: employee.id,
        name: employee.first_name + " " + employee.last_name,
        //value: '',
        //name:"none",
      }));
      //console.log("Adding a blank name", employeeChoice);
      employeeChoice.push({
        value:null,
        name:"none"
      })
      //console.log("After push", employeeChoice);

      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "Employees First Name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "Employess last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "Employees role id?",
            choices: roleChoice,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Employees manager's ID?",
            choices: employeeChoice,
          },
        ])
        .then(function (res) {
          console.log(res);
          connection.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", 
              [res.first_name, res.last_name, res.role_id, res.manager_id]
            ,
            function (error, data) {
              if (error) throw error;
              console.log(data);
              console.table("Inserted!");
              menu();
            }
          );
        });
    });
  });
}

//Add Department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department would you like to add?",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [res.department],
        function (error, data) {
          if (error) throw error;
          console.table("Inserted");
          menu();
        }
      );
    });
}

//Add Role
function addRole() {
  connection.query("SELECT * FROM department", function (error, data) {
    if (error) throw error;
    //console.log(data);
    var choicesdepartment = data.map((department) => ({
      value: department.id,
      name: department.name,
    }));
    inquirer
      .prompt([
        {
          message: "Role Name",
          type: "input",
          name: "title",
        },
        {
          message: "Salary",
          type: "number",
          name: "salary",
        },
        {
          message: "What is the department",
          type: "list",
          choices: choicesdepartment,
          name: "department_id",
        },
      ])
      .then(function (response) {
        console.log(response);
        connection.query(
          "INSERT INTO role (title, salary, department_id) values (?, ?, ?)",
          [response.title, response.salary, response.department_id],
          function (error, data) {
            if (error) throw error;
            console.log("New Role Created!");
            menu();
          }
        );
      });
  });
}

//View a list of employees
function viewEmployees() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS role, manager.first_name AS manager FROM employee LEFT JOIN role ON role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id", function (error, data) {
    if (error) throw error;
    console.table(data);
    menu();
  });
}

//View a list of departments
function viewDepartments() {
  connection.query("SELECT * FROM department", function (error, data) {
    if (error) throw error;
    console.table(data);
    menu();
  });
}

//View a list of roles
function viewRoles() {
  connection.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON department_id = department.id", function (error, data) {
    if (error) throw error;
    console.table(data);
    menu();
  });
}

//Update Employee Role
function updateEmployeeRole() {
  connection.query("SELECT * FROM employee", function (error, data) {
    if (error) throw error;
    var employeeSelect = data.map((employee) => ({
      value: employee.id,
      name: employee.first_name + " " + employee.last_name,
    }));
    connection.query("SELECT * FROM role", function (error, data) {
      if (error) throw error;
      var roleSelect = data.map((role) => ({
        value: role.id,
        name: role.title,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which Employee would you like to update?",
            name: "employee_id",
            choices: employeeSelect,
          },
          {
            type: "list",
            message: "What role would you like to assign?",
            name: "role_id",
            choices: roleSelect,
          },
        ])
        .then(function (response) {
          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [response.role_id, response.employee_id],
            function (error, data) {
                console.log(response)
              if (error) throw error;
              console.log("Updated!");
              //console.table(data);
              menu();
            }
          );
        });
    });
  });
  //menu();
}

//Delete Employee
function deleteEmployee() {
    connection.query("SELECT * FROM employee", function (error, data) {
        if (error) throw error;
        console.log(data);
        var employeeChoice = data.map((employee) => ({
            value:employee.id,
            name:employee.first_name + " " + employee.last_name,
        }));
        inquirer.prompt([ 
            {
                type:"list",
                name:"employeeName",
                message:"What employee would you like to delete?",
                choices:employeeChoice,
        },
    ])
    .then(function(res) {
        console.log(res);
        connection.query (
            `DELETE FROM employee WHERE id=${res.employeeName}`,
            function (error, data) {
                if (error) throw error;
                console.log(data);
                console.table("Removed!");
                menu();
            }
        )
    })
    })
}


//Delete Department
function deleteDepartment() {
  connection.query("SELECT * FROM department", function (error, data) {
      if (error) throw error;
      //console.log(data);
      var departmentChoice = data.map((department) => ({
          value:department.id,
          name:department.name,
      }));
      inquirer.prompt([ 
          {
              type:"list",
              name:"departmentName",
              message:"What department would you like to delete?",
              choices:departmentChoice,
      },
  ])
  .then(function(res) {
      console.log(res);
      connection.query (
          `DELETE FROM department WHERE id=${res.departmentName}`,
          function (error, data) {
              if (error) throw error;
              console.log(data);
              console.table("Removed!");
              menu();
          }
      )
  })
  })
}


//Delete Role
function deleteRole() {
  connection.query("SELECT * FROM role", function (error, data) {
      if (error) throw error;
      //console.log(data);
      var roleChoice = data.map((role) => ({
          value:role.id,
          name:role.title,
      }));
      inquirer.prompt([ 
          {
              type:"list",
              name:"roleName",
              message:"What role would you like to delete?",
              choices:roleChoice,
      },
  ])
  .then(function(res) {
      console.log(res);
      connection.query (
          `DELETE FROM role WHERE id=${res.roleName}`,
          function (error, data) {
              if (error) throw error;
              console.log(data);
              console.table("Removed!");
              menu();
          }
      )
  })
  })
}


//Fix if employee is a manager so they can select that they are a manager

//to select from two columns in a table:
//SELECT <column name>, <column name> FROM <table name>

//Curious on how to make each function its own .js file to make the code easier to read

//What Works
//View Employees; View departments; View Roles

//To Do
//Delete quit from departments
//Delete roles
//Delete employees
//Join employees to roles using 


//Other departments to add: Human Resources, Communication
//Roles for HR: HR Director; HR Administrator; Staffing Coordinator
//Roles for Communication: Communication lead; Specialist; Networking Specialist

//Employees to add:
//Xavier Nelson; Adam Clark
//Michelle Owens; Lillian Morris; Silvia Rivera