module.exports = function (grunt) {
  var config = {
    pkg: grunt.file.readJSON('package.json'),

    HOSTNAME: process.env.HOSTNAME || '0.0.0.0',
    PORT: process.env.PORT || 9042,

    requirejs: {
      build: {
        options: {
          baseUrl: 'src',
          paths: {
            'cs': 'support/require-cs/cs',
            'coffee-script': 'support/coffee-script/index',
            'combo': 'support/combo/src/combo',
            'implement': 'support/combo/src/combo/implementations/web/index'
          },
          stubModules: ['cs', 'coffee-script'],
          name: 'support/almond/almond',
          include: 'support/prodWrapper',
          insertRequire: ['support/prodWrapper'],
          out: 'src/main-built.js',
          optimize: 'uglify2'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: '<%= PORT %>',
          base: 'src',
          directory: 'src',
          keepalive: true,
          hostname: '<%= HOSTNAME %>'
        }
      }
    },

    open: {
      dev: {
        path: 'http://<%= HOSTNAME %>:<%= PORT %>/?debug=1'
      },
      prod: {
        path: 'http://<%= HOSTNAME %>:<%= PORT %>/'
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['requirejs']);
  grunt.registerTask('dev', ['open:dev', 'connect']);
  grunt.registerTask('prod', ['requirejs', 'open:prod', 'connect']);
};
