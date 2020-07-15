// dependencies 
const express = require("express");
const path = require("path");
const fs = require("fs");

// tells node that we are creating an "express" server
const app = express();

// sets an initial port
const PORT = process.env.PORT || 3000;

// listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// sets up the Express app to handle data parsing


// getting the html content

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

app.get("/api/notes", function(req, res) {

    fs.readFile("./db/db.json", "utf-8", function(error, data){
      if (error) {
        return console.log(error);
      } return res.json(JSON.parse(data));
    });  
});
// API POST request

// code for deleting notes

 
