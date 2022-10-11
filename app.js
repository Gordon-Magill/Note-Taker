// Express web framework
const express = require('express')
// UUID for creating unique ID's for notes
const uuid = require('uuid')
// path module for getting to public files
const path = require('path');
// fs module for reading and writing JSON to db.json
const fs = require('fs')

// Start app
const app = express();

// Middleware to enable JSON, proper routes, and file availability
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML Routes
// To notes.html
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/notes.html'));
});

// To index.html
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'))
})

// API Routes
// Reading note content from db.json
app.get('/api/notes', (req,res) => {

    // Stuff using req
    const thing = req.

    // Setting up the request
    res.status(200).json

})
// Writing note content to db.json
app.post('/api/notes', (req,res) => {
    
    // Stuff using req
    const thing = req.

    // Setting up the request
    res.status(200)
})
// Legendary, forbidden delete verb
app.delete('/api/notes', (req,res) => {

})

module.exports = app;