
module.exports = function(grunt) {
    //Load all grunt modules.
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);


    //Config grunt modules.
    grunt.initConfig({
        /*
        - Module for concatenate js/css files in one.
        - Also can add static data to files.
        */
        concat: {
            options: {
                separator: "\n\n\n"
            },
            js: {
                src: [
                    "app/lib/jquery-3.2.0.min.js",
                    "app/lib/tether.min.js",
                    "app/lib/bootstrap.min.js",
                    "app/lib/owl.carousel.min.js",
                    "app/lib/wow.min.js",
                    "app/lib/smooth-scroll.min.js",
                    "app/js/myScript.js"
                ],
                dest: "www/js/script.js"
            },
            css: {
                src: [
                    "temp/font-awesome.min.css",
                    "app/css/owl.carousel.min.css",
                    "app/css/owl.theme.default.min.css",
                    "app/css/bootstrap.min.css",
                    "app/css/animate.min.css",
                    "app/css/myStyle.css"
                ],
                dest: "www/css/style.css"
            },
            includeGoogleFont: {
                options: {
                    process: function(src, filepath) {
                        return "@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,700italic');" + src;
                    }
                },
                files: {
                    "www/css/style.min.css": "www/css/style.min.css",
                }
            }
        },
        /*
        Module for setting a watcher to specific file and execute some tasks when
        detecting the file is modified.
        */
        watch: {
            js: {
                files: ["app/js/**/*.js"],
                tasks: ["concat:js"]
            },
            css: {
                files: ["app/css/**/*.css"],
                tasks: ["concat:css"]
            }
        },
        //Module for minifying css files in one.
        cssmin: {
            dist: {
                files: {
                    "www/css/style.min.css": "<%= concat.css.src %>"
                }
            }
        },
        //Module for minifying js files in one.
        uglify: {
            dist: {
                files: {
                    "www/js/script.min.js": "<%= concat.js.src %>"
                }
            }
        },
        //Module for encoding images and fonts within css files.
        imageEmbed: {
            font: {
                src: "app/css/font-awesome.min.css",
                dest: "temp/font-awesome.min.css",
                options: {
                    deleteAfterEncoding : false,
                    maxImageSize: 0
                }
            }
        },
        //Module for compiling sass file to css.
        compass: {
            dist: {
                options: {
                    sassDir: "app/scss",
                    cssDir: "app/css"
                }
            }
        },
        //Module for removing files/folders.
        clean: {
            temp: {
                files: [{
                    dot: true,
                    src: ["temp"]
                }]
            },
            www: {
                files: [{
                    dot: true,
                    src: ["www"]
                }]
            }
        },
        //Module for copying files from a place to another.
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "app",
                    dest: "www",
                    src: [
                        "index.html",
                        "favicon.ico",
                        "templates/**",
                        "images/**"
                    ]
                }]
            }
        },
        //Module for adding prefixes.
        postcss: {
            options: {
                map: false,
                processors: [
                    require("pixrem")(),
                    require("autoprefixer")({browsers: "last 3 versions"}),
                    require("cssnano")()
                ]
            },
            dist: {
                src: "app/css/myStyle.css"
            }
        }
    });


    //Set how to execute the grunt config.
    grunt.registerTask("default", [
        "clean:www",
        "imageEmbed:font",
        "compass",
        "postcss",
        "cssmin",
        "concat:includeGoogleFont",
        "uglify",
        "copy",
        "clean:temp"
    ]);
};
