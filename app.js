// Express web framework
const express = require("express");
// path module for getting to public files
const path = require("path");
// The api router
const api = require('./routes/index')

// Start app
const app = express();

// Middleware to enable JSON, proper routes, and file availability
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use('/api',api)



// HTML Routes
// To notes.html
app.get("/notes", (req, res) => {
  console.log("Getting notes page");
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// To index.html
app.get("*", (req, res) => {
  console.log("getting index page");
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

module.exports = app;
