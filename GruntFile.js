module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
                compress: true,
                mangle: true
            },
            build: {
                src: 'public/<%= pkg.name %>.js',
                dest: 'public/<%= pkg.name %>.min.js'
            }
        },
        less: {
            build: {
                files: {
                    'public/css/styles.css': 'src/styles/bootstrap.less'
                }
            }
        },
        jshint: {
            files: ['src/**.js', 'public/app/**.js','public/dotvoting.js'],
            options: {
                bitwise: false,
                curly: true,
                eqeqeq: true,
                forin: false,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: false,
                plusplus: false,
                regexp: true,
                undef: true,
                strict: true,
                trailing: true,
                browser: true,
                node: true,
                es5: false,
                globals: {
                    define: true,
                    requirejs: true,
                    require: true,
                    describe: true,
                    it: true,
                    mocha: true,
                    chai: true,
                    mochaPhantomJS: true
                }
            }
        },
        markdown: {
            all: {
                options: {
                    gfm: true,
                    higlight: 'auto'
                },
                files: [{
                    expand: true,
                    src: '*.md',
                    dest: 'docs/html/',
                    ext: '.html'
                }]
            }
        },
        bower: {
            webapp: {
                options: {
                    base: './public',
                    install :true,
                    cleanTargetDir: true,
                    layout: 'byComponent',
                    overrideBowerDirectory : true,
                    copy:false,
                    cwd : './public'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-watcher');

    grunt.registerTask('build', ['jshint', 'less:build', 'uglify:build', 'markdown:all']);
    grunt.registerTask('install', ['bower:webapp']);
};