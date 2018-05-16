// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Employees (DATA)
// =============================================================
var employees = [
  {
    routeName: "jeff",
    name: "Jeff",
    role: "Administrator",
    age: 35,
    typingSpeed: 60
  },
  {
    routeName: "jessie",
    name: "Jessie",
    role: "Secretary",
    age: 27,
    typingSpeed: 80
  },
  {
    routeName: "jackie",
    name: "Jackie",
    role: "Director",
    age: 55,
    typingSpeed: 30
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Get all employees
app.get("/all", function(req, res) {
  res.json(employees);
});

// Search for Specific employee (or all employees) - provides JSON
app.get("/api/:employees?", function(req, res) {
  var chosen = req.params.employees;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < employees.length; i++) {
      if (chosen === employees[i].routeName) {
        return res.json(employees[i]);
      }
    }
    return res.json(false);
  }
  return res.json(employees);
});

// Create New employees - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newemployee = req.body;
  newemployee.routeName = newemployee.name.replace(/\s+/g, "").toLowerCase();

  console.log(newemployee);

  employees.push(newemployee);

  res.json(newemployee);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
