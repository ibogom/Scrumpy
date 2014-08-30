module.exports = function (grunt) {
    //описываем конфигурацию 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //подгружаем package.json, чтобы использовать его данные

        jshint: {     // описываем как будет проверять наш код - jsHint
          options: {
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            eqnull: true,
            browser: true,
            globals: {
              jQuery: true,
              $: true,
              console: true
            },
            ignores:['src/js/vendor/*.js', 'src/js/main.js', 'src/js/build.js']
          },
          '<%= pkg.name %>': {  //вставляем название проекта из package.json
            src: [ 'src/js/**/*.js']  //какие файлы надо проверять
          },
          uses_defaults: ['src/js/**/*.js']
        },

        handlebars:{
          compile:{
            options: {
              namespace: "Mamba",
              amd: "handlebars.runtime",
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
                'src/js/templateCollection.js' : [ 'src/templates/*.hbs']
              }
          }
        },

        concat: {  //описываем работу плагина конкатенации
            dist: {
                src: ['src/js/**/*.js'],  // какие файлы конкатенировать
                dest: 'dest/js/build.js'  // куда класть файл, который получиться после процесса конкатенации 
            }
        },
 
        uglify: {  //описываем работу плагина минификации js - uglify.
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' //комментарий который будет в минифицированном файле.
            },
 
            build: {
                src: 'dest/js/build.js',  // какой файл минифицировать
                dest: 'dest/js/build.min.js' // куда класть файл, который получиться после процесса минификации
            }
        },

        removelogging: { //описываем работу плагина удаления логов
                dist: {
                  src: "dest/js/build.min.js", // файл который надо отчистить от console.log
                  dest: "dest/js/build.clean.js" // выходной файл, который получим после очистки
                }
        },

        requirejs: {
            compile: {
              options: {
                mainConfigFile: "src/js/main.js", // главный файл с описанием конфигурации и билда require.js
                baseUrl: "src/js", 
                include: ['../../dest/js/build.js'],
                name: 'app', // название файла запускающего приложение
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

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dest/images/'
                }]
            }
        },

        watch: { //описываем работу плагина слежки за файлами.
            scripts: {
                files: ['src/js/*.js'],  //следить за всеми js файлами в папке src
                tasks: ['jshint','concat','uglify','removelogging']  //при их изменении запускать следующие задачи
            },
            css: {
                files: ['src/assets/sass/*.scss'], //следить за всеми css файлами в папке src
                tasks: ['sass','cssmin'] //при их изменении запускать следующую задачу
            },
            images: {
                files : ['src/assets/images/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        }
 
    });
 
    //подгружаем необходимые плагины
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    //регистрируем задачу 
    grunt.registerTask('default', ['jshint','handlebars','concat', 'uglify', 'removelogging','requirejs', 'sass', 'cssmin', 'imagemin', 'watch']); //задача по умолчанию, просто grunt
    grunt.registerTask('test', ['jshint']); 
};