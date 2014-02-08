exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^vendor|bower_components/
      order:
        before: [
          'app/js/module.js'
        ]

    stylesheets:
      joinTo:
        'css/app.css': /^app/
        'css/vendor.css': /^vendor|bower_components/

    templates:
      joinTo: 'scripts/app.js'

  modules:
    wrapper: false

  plugins:

    autoReload:
      enabled:
        css: on
        js: on
        assets: on
      port: [1234, 2345, 3456]
      delay: 200 if require('os').platform() is 'win32'

    uglify:
      mangle: false