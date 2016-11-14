module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        node: true
      },
      files: {
        src: [ 'Gruntfile.js' ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', [ 'jshint' ]);
};