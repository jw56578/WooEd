module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            options: { force: true }, output: ['./dist/*','./Build'] 
        },
        concat: {
            options: {
                seperator:';'
            },
            dist: {
                src: ['src/*.js'],
                dest: 'Build/Release/app.js'
            }
        },
        jshint:{
            options:{},
            files:['src/*.js']
        },
        uglify: {
            development: {
                files: {
                    'dist/app.js': 'Build/Release/app.js'
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
    grunt.registerTask('default', ['clean']);
    grunt.registerTask('refreshBrowser', ['browserSync']);
    
}