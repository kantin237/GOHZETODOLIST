const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    
    host: "localhost",
    user: "root",
    password: "password",
    database: "todolist"
})

app.post("/create", (req, res) => { 
    const name = req.body.name;
    const age = req.body.age;

    db.query("INSERT INTO employees (name, age) VALUES (?,?)", 
        [name, age], 
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get("/tasks", (req, res) => {
    db.query("SELECT * FROM tasks", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.post("/createtask", (req, res) => { 
    console.log(req.body)
    const name = req.body.name;
    const description = req.body.description;
    const creationdate = req.body.creationdate;
    const dateofcompletion = req.body.dateofcompletion;
    const status = req.body.status;

    db.query("INSERT INTO tasks (name, description, creationdate, dateofcompletion, status) VALUES (?,?,?,?,?)", 
        [name, description, creationdate, dateofcompletion, status], 
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});


app.listen(3001, () => {
    console.log("yeaahhhh, your server is running on port 3001");
});