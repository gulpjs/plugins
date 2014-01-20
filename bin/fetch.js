var http = require('http');
var fs = require('fs');

var file = fs.createWriteStream("tmp/public/data.json");
var request = http.get("http://registry.npmjs.org/-/_view/byKeyword?startkey=[%22gulpplugin%22]&endkey=[%22gulpplugin%22,{}]&group_level=3", function(response) {
  response.pipe(file);
});