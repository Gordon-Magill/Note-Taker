const express = require("express");
const noteRouter = require("./notes");

const app = express();

// Simple middleware for API routes
app.use("/notes", noteRouter);

module.exports = app;
