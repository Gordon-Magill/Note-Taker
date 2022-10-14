const router = require("express").Router();
// UUID for creating unique ID's for notes
const uuid = require("uuid");
// fs module for reading and writing JSON to db.json
const fs = require("fs");

// API Routes
// Reading note content from db.json
router.get("/", (req, res) => {
  //   console.log("/api/notes GET request was called");
  fs.readFile("./db/db.json", (err, data) => {
    err ? console.log("Error reading db.json") : res.json(JSON.parse(data));
    res.end();
  });
});

// Writing note content to db.json
router.post("/", (req, res) => {
//   console.log("/api/notes POST request was called...");
  // console.log(req)
  let noteJSON = req.body;

  //   Technically the app as written doesn't accommodate updating note content after saving, but it felt reasonable
  //   to add some facility for it just in case
  let overwriteFlag = false;

  if (!noteJSON.id) {
    // If the note didn't have an ID, it must be new, and gets a random one assigned to it
    noteJSON.id = uuid.v4();
  }

  //   Reading exising data in
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
      });

      // If no content was overwritten, it must be a new file to append
      if (!overwriteFlag) {
        arrayJSON.push(noteJSON);
      }

      //   Writing the new content to file
      fs.writeFile("./db/db.json", JSON.stringify(arrayJSON), (err) => {
        err ? console.log(err) : console.log("Wrote new db.json content");
      });
      res.end();
    }
  });
});

// Legendary, forbidden delete verb
router.delete("/:id", (req, res) => {
  // Get existing data to search for the note to delete
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let arrayJSON = JSON.parse(data);

      // Search for the element to delete
      arrayJSON.forEach((el, index) => {
        if (el.id === req.params.id) {
          arrayJSON.splice(index, 1); //Remove the matching element
        }
      });

      // Write the reduced array back to file
      fs.writeFile("./db/db.json", JSON.stringify(arrayJSON), (err) => {
        err ? console.log(err) : console.log("Entry deleted from db.json");
        res.end();
      });
    }
  });
});

module.exports = router;
