// Express web framework
const express = require('express')
// UUID for creating unique ID's for notes
const uuid = require('uuid')
// path module for getting to public files
const path = require('path');
// fs module for reading and writing JSON to db.json
const fs = require('fs')
// the db.json data itself
// const dbjson = require('./db/db.json')

// Start app
const app = express();

// Middleware to enable JSON, proper routes, and file availability
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// API Routes
// Reading note content from db.json
app.get('/api/notes', (req,res) => {
    console.log('/api/notes GET request was called')
    fs.readFile('./db/db.json', (err, data) => {
        err
            ? console.log('Error reading db.json')
            : res.json(JSON.parse(data))
    })
});

// Writing note content to db.json
app.post('/api/notes', (req,res) => {
    console.log('/api/notes POST request was called with req:')
    console.log(req)
    let newJSON = req.body;

    
    // Stuff using req
    // const thing = req.

    // Setting up the request
    // res.status(200)
})

// HTML Routes
// To notes.html
app.get('/notes', (req,res) => {
    console.log('Getting notes page')
    res.sendFile(path.join(__dirname,'/public/notes.html'));
});

// To index.html
app.get('*', (req,res) => {
    console.log('getting index page')
    res.sendFile(path.join(__dirname,'/public/index.html'))
});




// Legendary, forbidden delete verb

// app.delete('/api/notes', (req,res) => {

// })


// console.log(`${uuid.v4()}`)
module.exports = app;