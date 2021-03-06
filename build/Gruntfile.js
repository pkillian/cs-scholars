module.exports = function (grunt) {
  
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-newer");
  grunt.loadNpmTasks("grunt-ngmin");

  // if you simply run "grunt" these default tasks will execute, IN THE ORDER THEY APPEAR!
  grunt.registerTask('default', ["jshint", "ngmin", "uglify", "less", "cssmin", "copy"]);
  
  // running all the tasks takes more than a couple of seconds, so don't default that
  grunt.registerTask('quick', ["newer:jshint", "newer:ngmin", "newer:uglify:scholars", "newer:less", "newer:cssmin", "newer:copy:templates", "newer:copy:js"]);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // ##################### JAVASCRIPT ############################ //
    
    /* http://www.jshint.com/options/ */
    jshint: {
      files: ['../src/js/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    
    // minify the angularjs files (shouldn't be done via uglifyjs)
    ngmin: {
      scholars: {
        src: ['../src/js/scholars.app.js', '../src/js/**/*.js'],
        dest: '../src/tmp/scholars.app.ngmin.js'
      }
    },

    uglify: { // only uglify what needs to be uglified
      options: {
        banner: '/* generated: <%= grunt.template.today("yyyy-mm-dd @ HH:MM:ss") %> */\n'
      },
      scholars: {
        src: ['../src/tmp/scholars.app.ngmin.js'],
        dest: '../docroot/js/scholars.min.js'
      }
    },
    
    less: {
      // external: {
      //   files: { /* (dest : src) */
      //     '../src/tmp/bootstrap.max.css' : '../src/components/bootstrap/less/bootstrap.less'
      //   }
      // },
      scholars: {
        files: { /* (dest : src) */
          '../src/tmp/main-light.max.css' : '../src/less/theme-light.less'
        },
        options: {
          paths: ['../src/less']
        }
      }
    },
    
    /* (dest : src) */
    cssmin: {
      compress: {
        files: {
          "../docroot/css/main-light.min.css": ["../src/tmp/main-light.max.css"]
        }
      }
    },
    
    copy: {
      templates: { // this will move from copy to compile at some point maybe
        files: [
          {
            expand: true, 
            cwd: "../src/templates", 
            src: ['**'], 
            dest: '../docroot/templates/',
            filter: 'isFile'
          }
        ]
      },
      js: { // any files that were minified by the authors should be in here
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              '../src/components/angular/angular.min.js',
              '../src/components/jquery/jquery.min.js'
            ],
            dest: '../docroot/js/',
            filter: 'isFile'
          }
        ]
      },
      css: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              '../src/components/font-awesome/css/font-awesome.min.css',
            ],
            dest: '../docroot/css/',
            filter: 'isFile'
          }
        ]
      },
      // img: {
      //   files: [
      //     {
      //       expand: true,
      //       flatten: true,
      //       src: [
      //         '../src/components/jquery.ui/themes/base/images/*'
      //       ],
      //       dest: '../docroot/images/',
      //       filter: 'isFile'
      //     }
      //   ]
      // },
      font: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['../src/components/font-awesome/fonts/*'],
            dest: '../docroot/fonts/',
            filter: 'isFile'
          }
        ]
      }
    },
    
    /* watch the development files for saves and do stuff when we observe a save */
    watch: {
      css: {
        files: "<%= '../src/less/**/*' %>",
        tasks: ["reload"]
      }
    }
  });
};
