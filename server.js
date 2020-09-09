// dependencies 
const express = require("express");
const path = require("path");
const fs = require("fs");
const { uuid } = require('uuidv4');

// tells node that we are creating an "express" server
const app = express();

// sets an initial port
const PORT = process.env.PORT || 3000;

// sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); 

// getting the html content
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

//api call to read and retrieve all notes as JSON
app.get("/api/notes", function(req, res) {

    fs.readFile("./db/db.json", "utf-8", function(error, data){
      if (error)  throw error;

       return res.json(JSON.parse(data));
    });  
});
// API POST request, Receive a new note, append it to the db.json file, and return the note
app.post("/api/notes", function(req, res) {
  let note = (req.body)
  let id = uuid(); 
  note.id = id
  let notesArray;
  let savedNotes = fs.readFileSync("./db/db.json","utf-8");
  notesArray = JSON.parse(savedNotes);
  notesArray.push(note);
  
  fs.writeFile("./db/db.json", JSON.stringify(notesArray), function(error){
    if (error) {
      console.log(error);
    }
      console.log(notesArray); 
      return res.json(notesArray); 
  });
});
// code for deleting notes
app.delete("/api/notes/:id", function(req, res){
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteid = req.params.id;
  console.log(`Deleting note with ID ${noteid}`);
  savedNotes = savedNotes.filter(currNote => {
      return currNote.id != noteid;
    })

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});
 



// listener
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});