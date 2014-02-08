module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.initConfig({

    'gh-pages': {
      options: {
        base: 'public',
        branch: 'gh-pages',
        message: '[auto] Deployed to gh-pages'
      },
      src: '**/*'
    }

  });

};