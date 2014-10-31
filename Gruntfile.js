module.exports = function (grunt) {
    "use strict";
    //описываем конфигурацию 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //подгружаем package.json, чтобы использовать его данные

        clean: {
            short: ["dest/js", "dest/css"]
        },

        jshint: {     // описываем как будет проверять наш код - jsHint
          options: {
              strict: true,
              expr: true,
              onecase: true,
              maxcomplexity: 8,
              curly: false,     //change
              eqeqeq: false, //change
              forin: true,
              latedef: true,
              newcap: true,
              noarg: true,
              noempty: false, //change
              nonew: false,
              regexp: true,
              undef: true,
              evil: true,
              // options here to override JSHint defaults
              globals: {
                  jQuery: true,
                  console: true,
                  module: true,
                  document: true,
                  window: true,
                  define: true
              },
              ignores: [
                  'src/js/app/config/config.js',
                  'src/js/app/init/init.js',
                  'src/js/libs/*.js',
                  'src/js/test/*.js',
                  'src/js/app/App.js',
                  'src/js/app/templates/templateCollection.js'
              ]
          },
          uses_defaults: ['src/js/app/**/*.js']
        },

        handlebars:{
          compile:{
            options: {
              namespace: "Scrumpy",
              amd: "handlebars",
              partialsUseNamespace: true,
              partialRegex: /.*/,
              compilerOptions: {
                knownHelpers: {
                  "each": true,
                  "if": true,
                  "unless": true
                }
              },
               processPartialName: function(filePath) { // на входе получаем путь к шаблону:  templates/_header.hbs
                  var pieces = filePath.split("/");
                  return pieces[pieces.length - 1]; // на выходе поучаем только название шабона: _header.hbs
               }
            },
              files: {
                'src/js/app/templates/templateCollection.js' : [ 'src/js/app/templates/*.hbs']
              }
          }
        },
        //Мультиязычность
        ember_i18n_precompile: {
            english: {
                src:['src/js/app/languages/en.js'],
                dest:'dest/js/en.js'
            }
        },

        requirejs: {
            compile: {
              options: {
                optimize: 'none',
                generateSourceMaps: true,
                preserveLicenseComments: false,
                useSourceUrl: true,
                mainConfigFile: "src/js/app/config/config.js", // главный файл с описанием конфигурации и билда require.js
                baseUrl: "src/js/app",
                name: 'init/init', // название файла запускающего приложение
                out: "dest/js/main.min.js" // выходящий минифицированный и конкатенированный файл готовые для продакшена
              }
            }
        },

        sass:{
            compile: {
                    files: {
                    // в эту папку получиться скомпелированный и сконкатенированный css файл готовый для продакшена
                    'dest/css/main.css' : ['src/assets/sass/main.scss']  
                  }
            }
        },

        cssmin: { //описываем работу плагина минификации и конкатенации css.
            with_banner: {
                options: {
                    banner: '/*Minimalized CSS file <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'   //комментарий который будет в output файле.
                },
 
                files: {
                    'dest/css/main.min.css' : ['dest/css/main.css']   // первая строка - output файл. массив из строк, какие файлы конкатенировать и минифицировать.
                }
            }
        },

        connect: {
            options: {
                port: 8002,
                hostname: '*',
                keepalive: true,
                protocol: 'http'
            },
            server: {
                options: {
                    base: './dest'
                }
            }

        },

        watch: { //описываем работу плагина слежки за файлами.
            scripts: {
                files: ['src/js/app/**/*.js'],  //следить за всеми js файлами в папке src
                tasks: ['jshint','requirejs']  //при их изменении запускать следующие задачи
            },
            templates:{
                files:['src/js/app/templates/*.hbs'],
                tasks:['handlebars','requirejs']
            },
            css: {
                files: ['src/assets/sass/*.scss'], //следить за всеми css файлами в папке src
                tasks: ['sass','cssmin'] //при их изменении запускать следующую задачу
            }
        }
 
    });
 
    //подгружаем необходимые плагины
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-ember-i18n-precompile');

    //регистрируем задачу 
    grunt.registerTask('default', ['clean','jshint','handlebars','requirejs', 'sass', 'cssmin','watch']); //задача по умолчанию, просто grunt
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('server', ['connect:server']);
};