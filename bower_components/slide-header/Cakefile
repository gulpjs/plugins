cs      = require('coffee-script')
fs      = require('fs')
colors  = require('colors')
uglify  = require("uglify-js")

task "build", "compiles to source", ->
  console.log "Compiling Source".green.inverse
  source   = fs.readFileSync(__dirname+("/src/slide-header.coffee"), "utf8")
  compiled = cs.compile(source)
  fs.writeFileSync(__dirname+"/slide-header.js", uglify.minify(compiled, {fromString: 1}).code)
