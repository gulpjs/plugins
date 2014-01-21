var http = require('http');
var fs = require('fs');

var file = fs.createWriteStream("/tmp/data.json");
var request = http.get("http://npmsearch.com/query?q=keywords:gulpplugin,gulpfriendly&fields=name,keywords,rating,description,author,modified,homepage,version,license&start=0&size=10000&sort=rating:desc", function (response) {
  response.pipe(file);
});