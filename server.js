// import express
var express = require('express');
var fs = require('fs');

// init express app
var app = express();

// define static resources
app.use("/", express.static(__dirname + "/public"));

// get access to the writable files
app.get('/data.json', function (req, res) {
  fs.readFile(__dirname + "tmp/data.json", function (err, data) {
    res.end(data, 'utf-8');
  });

});

// start listening
app.listen(process.env.PORT || 5000);
