const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to a basic express App");
});

// Mock APIs
app.get("/users", (req, res) => {
    
    res.json([
      { name: "William", location: "Abu Dhabi" },
      { name: "Chris", location: "Vegas" }
    ]);
});

app.post("/user", (req, res) => {
    const { name, location } = req.body;
  
    res.send({ status: "User created", name, location });
});

app.use(require('./users.route'));

module.exports = app;

