module.exports = function(grunt) {
    /*grunt.registerTask("speak", function() {
        console.log("I'm speaking");
    });

    grunt.registerTask("yell", function() {
        console.log("I'm yelling");
    });

    grunt.registerTask("both", ["speak", "yell"]);

    grunt.registerTask("default", ["both"]);*/

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        concat: {
            options: {
                separator: "\n\n\n"
            },
            js: {
                src: [
                    "js/jquery-3.2.0.min.js",
                    "js/tether.min.js",
                    "js/bootstrap.min.js",
                    "js/owl.carousel.min.js",
                    "js/wow.min.js",
                    "js/smooth-scroll.min.js",
                    "js/myScript.js"
                ],
                dest: "dist/js/app.js"
            },
            css: {
                src: [
                    "css/font-awesome.min.css",
                    "css/owl.carousel.min.css",
                    "css/owl.theme.default.min.css",
                    "css/bootstrap.min.css",
                    "css/animate.min.css",
                    "css/myStyle.css"
                ],
                dest: "dist/css/style.css"
            }
        },
        watch: {
            js: {
                files: ["js/**/*.js"],
                tasks: ["concat:js"]
            },
            css: {
                files: ["css/**/*.css"],
                tasks: ["concat:css"]
            }
        },
        cssmin: {
            dist: {
                files: {
                    "css/style.min.css": [
                        "temp/font-awesome.min.css",
                        "css/owl.carousel.min.css",
                        "css/owl.theme.default.min.css",
                        "css/bootstrap.min.css",
                        "css/animate.min.css",
                        "css/myStyle.css"
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    "js/script.min.js": [
                        "js/jquery-3.2.0.min.js",
                        "js/tether.min.js",
                        "js/bootstrap.min.js",
                        "js/owl.carousel.min.js",
                        "js/wow.min.js",
                        "js/smooth-scroll.min.js",
                        "js/myScript.js"
                    ]
                }
            }
        },
        imageEmbed: {
            dist: {
                src: "css/font-awesome.min.css",
                dest: "temp/font-awesome.min.css",
                options: {
                    deleteAfterEncoding : false,
                    maxImageSize: 0
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'scss',
                    cssDir: 'dist'
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ["temp"]
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dest: "scss",
                    src: [
                        "index.html"
                    ]
                }]
            }
        }
    });

    grunt.registerTask("default", [
        "imageEmbed",
        "cssmin",
        "uglify",
        "clean"
    ]);
};
