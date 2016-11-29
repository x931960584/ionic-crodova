// Gruntfile
/*jslint devel: true, node: true, white:true */
module.exports = function(grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);
    var config = {
        src: 'src',
        tmp: 'tmp',
        release: 'www'
    };
    Date.prototype.Format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };
    var urlArgs = 'v1.0_' + (new Date().Format('yyyyMMdd')) + '_' + (new Date()).getTime();
    grunt.initConfig({
        config: config,
        clean: {
            tmp: ['<%= config.tmp %>/'],
            release: ['<%= config.release %>/']
        },
        sass: { // Task
            dist: { // Target
                options: {
                    sourcemap:'none',
                    loadPath: ['src/lib/ionic/scss/']
                },
                files: { // Dictionary of files
                    '<%= config.src %>/css/sass.css': 'scss/**/*.scss', // 'destination': 'source'
                }
            }
        },
        concat: {
            css: {
                src: ['<%= config.src %>/css/**/*.css'],
                dest: '<%= config.tmp %>/css/main.css'
            },
            js: {
                src: ['<%= config.src %>/lib/ionic/js/ionic.bundle.js', '<%= config.src %>/lib/ngCordova/dist/ng-cordova.js', '<%= config.src %>/js/**/*.js'],
                dest: '<%= config.tmp %>/js/main.js'
            }
        },
        copy: {
            css: {
                files: [{
                    'expand': true,
                    'cwd': '<%=config.tmp%>/css',
                    'src': 'main.css',
                    'dest': '<%=config.release%>/css'
                }]
            },
            js: {
                files: [{
                    'expand': true,
                    'cwd': '<%=config.tmp%>/js',
                    'src': 'main.js',
                    'dest': '<%=config.release%>/js'
                }]
            },
            fonts: {
                files: [{
                    'expand': true,
                    'cwd': '<%=config.src%>/lib/ionic/fonts',
                    'src': '*.*',
                    'dest': '<%=config.release%>/lib/ionic/fonts'
                }]
            },
            images: {
                files: [{
                    'expand': true,
                    'cwd': '<%=config.src%>/img',
                    'src': '*.*',
                    'dest': '<%=config.release%>/img'
                }]
            },
            views: {
                files: [{
                    'expand': true,
                    'cwd': '<%=config.src%>/views',
                    'src': '**/*.*',
                    'dest': '<%=config.release%>/views'
                }]
            },
            otherFiles: {
                files: [{
                    'expand': true,
                    'cwd': '<%=config.src%>/',
                    'src': '*.*',
                    'dest': '<%=config.release%>/'
                }]
            }
        },
        replace: {
            release: {
                src: ['<%=config.release%>/index.html'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: 'main.css',
                    to: urlArgs + '.css'
                }, {
                    from: 'main.js',
                    to: urlArgs + '.js'
                }]
            }
        },
        watch: {
            src: {
                files: ['<%=config.src%>/**/*.*'],
                tasks: [
                    'clean:tmp',
                    'sass',
                    'concat:css',
                    'concat:js',
                    'copy:css',
                    'copy:js',
                    'copy:fonts',
                    'copy:images',
                    'copy:views',
                    'copy:otherFiles'
                ],
            }
        },
        shell: {
            runAndroid: {
                command: 'osascript -e \'tell application "System Events" to tell process "Terminal" to activate\' -e \'tell application "Terminal" to do script "cd work/test/jiapin && sudo ionic run android -l -c -s"\''
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //开发环境
    grunt.registerTask('develop', [
        'clean:tmp',
        'clean:release',
        'sass',
        'concat:css',
        'concat:js',
        'copy:css',
        'copy:js',
        'copy:fonts',
        'copy:images',
        'copy:views',
        'copy:otherFiles',
        'shell:runAndroid',
        'watch',
    ]);
    grunt.registerTask('default', [
        'develop'
    ]);
};
