# Employee Tracker
### Table of Contents
- [Description](#Description)
- [Video Links](#video-link)
- [How to Use](#how-to-use)
- [Sources](#sources)

## Description
This is an application that allows the user to track employees, departments, and roles via the terminal.

---
## Video Link
There are many features to this application so there are three videos. 
### Video 1 [Link to Video 1](https://drive.google.com/file/d/1nLYfGJmI5qSLCMsAyXtl5yl-cyNdZApd/view)
This video shows how the user can view department, roles, and employees.

---
### Video 2 [Link to Video 2](https://drive.google.com/file/d/1f6pb20KEklsIUbtzH7ajpQo6eXEVHjMH/view)
This video shows how the user can add department, roles, and employees. It also shows how to delete an employee and role.

---
### Video 3 [Link to Video 3](https://drive.google.com/file/d/1h6W6OcB6nd_1xm7r1BnYuz8zMQSPGWnW/view)
This video shows how the user can delete a department. It also shows how to exit the application.

---
## How to Use
Install the necessary NPM packages to run the program. You will need inquirer, mysql, and console-table. 
```bash
npm install inquirer
npm install mysql
npm install console.table
```
You will need to add the database to your workbench. In order for it to work, you must update your credentials in the index.js file. From there, run
```bash
mysql -uroot -p < db/employeetrac_db.sql
```
Add the seeds.sql file via the terminal.

After you install the NPM packages, seed the database and seed file, open the terminal and run 
```bash
node index.js
```

From there, you can add or delete departments, roles, and employees. You can also update an employee's role.

---
## Sources
Created and designed by me. Click [whatawhat](www.github.com/whatawhat) to visit my repository.

