// Express web framework
const express = require("express");
// UUID for creating unique ID's for notes
const uuid = require("uuid");
// path module for getting to public files
const path = require("path");
// fs module for reading and writing JSON to db.json
const fs = require("fs");
const e = require("express");
// the db.json data itself
// const dbjson = require('./db/db.json')

// Start app
const app = express();

// Middleware to enable JSON, proper routes, and file availability
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// API Routes
// Reading note content from db.json
app.get("/api/notes", (req, res) => {
  console.log("/api/notes GET request was called");
  fs.readFile("./db/db.json", (err, data) => {
    err ? console.log("Error reading db.json") : res.json(JSON.parse(data));
    res.end();
  });
});

// Writing note content to db.json
app.post("/api/notes", (req, res) => {
  console.log("/api/notes POST request was called...");
  // console.log(req)
  let noteJSON = req.body;
  let overwriteFlag = false;

  if (!noteJSON.id) {
    // If the note didn't have an ID, it must be new, and gets a random one assigned to it
    console.log(
      `Note that was passed to POST endpoint was missing id, now generating one for it...`
    );
    noteJSON.id = uuid.v4();
    console.log(`New note object is: ${JSON.stringify(noteJSON)}`);
  } else {
    console.log(
      `Note that was passed to POST endpoint already had an id, proceeding to write file...`
    );
  }

  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let arrayJSON = JSON.parse(data);
      arrayJSON.forEach((el, index, origArray) => {
        // If the ID of the current note to be saved is found on an existing member of the db.json objects, overwrite the content of that entry
        if (el.id === noteJSON.id) {
          origArray[index] = noteJSON;
          overwriteFlag = true;
        }
        // If no match was found, push the new note into the array
      });

      // If no content was overwritten, it must be a new file to append
      if (!overwriteFlag) {
        arrayJSON.push(noteJSON);
      }

      fs.writeFile("./db/db.json", JSON.stringify(arrayJSON), (err) => {
        err ? console.log(err) : console.log("Wrote new db.json content");
      });
      res.end();
    }
  });
});

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

// Legendary, forbidden delete verb
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let arrayJSON = JSON.parse(data);
      let newArray = [];
      arrayJSON.forEach((el) => {
        if (el.id !== req.params.id) {
          newArray.push(el);
        }
      });
      fs.writeFile("./db/db.json", JSON.stringify(newArray), (err) => {
        err ? console.log(err) : console.log("Entry deleted from db.json");
        res.end();
      });
    }
  });
});

// console.log(`${uuid.v4()}`)
module.exports = app;
