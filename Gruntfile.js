module.exports = function(grunt){

grunt.loadNpmTasks("grunt-contrib-concat");
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');

grunt.loadNpmTasks('grunt-ng-annotate');  //linha adicionada minificacao angular js
grunt.loadNpmTasks('grunt-angular-templates'); //linha adicionada para criação de templates html

grunt.file.defaultEncoding = 'UTF-8';

grunt.initConfig({

pkg: grunt.file.readJSON('package.json'),

concat: {
      js :  {  //target
        src : [ 'public/min-safe/*.js'],

        dest :  'public/js/min/app.js'
      }
    },
    uglify: {
      options : {
        ascii_only : true
      },
      my_target: {
        files: {
          'public/js/min/app.min.js': ['public/js/min/app.js']
        }
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      app: {
        files: {
          'public/min/angular.js': ['node_modules/angular/angular.js'],
          'public/min/angular-aria.js': ['node_modules/angular-aria/angular-aria.js'],
          'public/min/angular-animate.js': ['node_modules/angular-animate/angular-animate.js'],
          'public/min/angular-material.js': ['node_modules/angular-material/angular-material.js'],
          'public/min/angular-route.js': ['node_modules/angular-route/angular-route.js'],
          'public/min-safe/app.js': ['app/app.js'],
          'public/min-safe/config.js': ['app/config/config.js'],
          'public/min-safe/detalheCandidatoController.js': ['app/controllers/detalheCandidatoController.js'],
          'public/min-safe/prefeitosController.js': ['app/controllers/prefeitosController.js'],
          'public/min-safe/vereadoresController.js': ['app/controllers/vereadoresController.js'],
          'public/min-safe/routeConfig.js': ['app/config/routeConfig.js'],
          'public/min-safe/eleicoesAPIservice.js': ['app/services/eleicoesAPIservice.js']

        }
      }
    },
    ngtemplates:  {
      app:        {
        src:      ['app/views/**.html'],
        dest:     'public/js/tpl.js',
        options:    {
          htmlmin:  {
            collapseBooleanAttributes:      true,
            removeAttributeQuotes:          true,
            collapseWhitespace:             true,
            removeComments:                 true, // Only if you don't use comment directives!
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true,
            keepClosingSlash:               true
          }
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/css/style.min.css': ['public/css/style.css'],
          'public/css/bootstrap.min.css': ['public/css/bootstrap.css']
        }
      }
    },
});

// links - tarefas
  grunt.registerTask('concatenar', ['uglify', 'cssmin']);
  grunt.registerTask('minhtml', ['ngtemplates']);
  grunt.registerTask('mina', ['ngAnnotate', 'concat', 'uglify']);

  // tarefas padrão
  grunt.registerTask('default', ['concatenar', 'mina', 'minhtml']);

}
