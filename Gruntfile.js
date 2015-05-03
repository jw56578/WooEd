module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            options: { force: true }, output: ['./dist/*']
        },
        concat: {
            options: {
                seperator:';'
            },
            dist: {
                src: ['src/*.js'],
                dest: 'dist/app.js'
            }
        },
        jshint:{
            options:{},
            files:['src/*.js']
        },
        uglify: {
            development: {
                files: {
                    'dist/app.js': 'dist/app.js'
                }
            },
            options:{}
        },
        watch:{
            scripts:{
                files:['src/*.js'],
                tasks:['default'],
                options:{spawn:false}
            }
        },
        browserSync: {
            bsFiles: {
                src : 'src/*.js'
            },
            options: {
                server: {
                    baseDir: "./"
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['clean','concat','uglify']);
    grunt.registerTask('refreshBrowser', ['browserSync']);
    
}