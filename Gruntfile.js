
module.exports = function(grunt) {
    //Config grunt modules.
    grunt.initConfig({
        //Load package file
        pkg: grunt.file.readJSON("package.json"),

        /*
        - Module for concatenate js/css files in one.
        - Also can add static data to files.
        */
        concat: {
            js: {
                options: {
                    //Define a separator between files.
                    separator: "\n\n\n",

                    //Create a banner and prepend it to new file.
                    stripBanners: true,
                    banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */"
                },
                src: [
                    "node_modules/jquery/dist/jquery.min.js",
                    "node_modules/tether/dist/js/tether.min.js",
                    "node_modules/bootstrap/dist/js/bootstrap.min.js",
                    "node_modules/owl.carousel/dist/owl.carousel.min.js",
                    "node_modules/wowjs/dist/wow.min.js",
                    "node_modules/smooth-scroll/dist/js/smooth-scroll.min.js",
                    "app/js/**/*.js"
                ],
                dest: "www/js/main.js"
            },
            css: {
                options: {
                    //Define a separator between files.
                    separator: "\n\n\n",

                    //Create a banner and prepend it to new file.
                    stripBanners: true,
                    banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */"
                },
                src: [
                    "temp/fonts/font-awesome.min.css",
                    "node_modules/owl.carousel/dist/assets/owl.carousel.min.css",
                    "node_modules/owl.carousel/dist/assets/owl.theme.default.min.css",
                    "node_modules/bootstrap/dist/css/bootstrap.min.css",
                    "node_modules/animate.css/animate.min.css",
                    "app/css/*.css"
                ],
                dest: "www/css/styles.css"
            },
            addFontsBuild: {
                options: {
                    process: function(src, filepath) {
                        return "@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,700italic');\n" + src;
                    }
                },
                files: {
                    "www/css/styles.min.css": "www/css/styles.min.css"
                }
            },
            addFontslocal: {
                options: {
                    process: function(src, filepath) {
                        return "@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,700italic');\n" + src;
                    }
                },
                files: {
                    "app/css/styles.css": "app/css/styles.css"
                }
            }
        },

        /*
        Module for setting a watcher to specific file and execute some tasks when
        detecting the file is modified.
        */
        watch: {
            options: {
                //Make watcher reaction to be faster
                spawn: false,

                /*
                If previous spawn doesn't finish and a new one comes up, then interrupt the
                previous one and execute a new one with last changes.
                */
                interrupt: true,

                //Set a delay between spawns.
                //debounceDelay: 9000,

                dateFormat: function(time) {
                    grunt.log.writeln("The watch finished in " + time + "ms at" + (new Date()).toString());
                    grunt.log.writeln("Waiting for more changes...");
                },

                livereload: true
            },
            js: {
                files: ["app/js/**/*.js"]
            },
            sass: {
                files: ["app/scss/*.scss"],
                tasks: [
                    "compass:convert",
                    "concat:addFontslocal",
                    "clean:general"
                ]
            },
            html: {
                files: [
                    "app/**/*.html"
                ]
            }
        },

        //Module for handling local server.
        connect: {
            dist: {
                options: {
                    port: 9000,
                    hostname: "localhost",
                    base: "./",
                    livereload: true
                }
            }
        },

        //Module for opening a browser.
        open: {
            dist: {
                path: "http://localhost:9000/app/",
                app: "Google Chrome" //Options: "Firefox", "Safari"
            }
        },

        //Module for minifying css files.
        cssmin: {
            //Convert all styles files to .min.css and combine them in one output file.
            combine: {
                options: {
                    mergeIntoShorthands: false,
                    roundingPrecision: -1
                },
                files: {
                    "www/css/styles.min.css": "<%= concat.css.src %>"
                }
            },

            //Convert all styles files to .min.css.
            convert: {
                files: [{
                    expand: true,
                    cwd: "app/",
                    src: "css/*.css",
                    dest: "temp/",
                    ext: ".min.css"
                }]
            }
        },

        //Module for minifying js files. Uglify doesn't support Javascript ES6
        uglify: {
            //Convert all js files to .min.js and combine them in one output file.
            combine: {
                options: {
                    //Prevent changes in variable and function names.
                    mangle: false,

                    //Specify identifiers to leave untouched.
                    /*mangle: {
                        reserved: [
                            "jQuery"
                        ]
                    },*/

                    compress: {
                        //Discard calls to console.* and supress warning messages in the console.
                        //drop_console: true,

                        //This is commonly used to remove debug code blocks for production builds.
                        /*global_defs: {
                            "DEBUG": false
                        },
                        dead_code: true*/
                    },

                    //Make the code neat to debug.
                    //beautify: true,

                    //Create a banner and prepend it to new js file.
                    banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */"
                },
                files: {
                    "www/js/main.min.js": "<%= concat.js.src %>"
                }
            },

            //Convert all js files to .min.js.
            convert: {
                files: [{
                    expand: true,
                    cwd: "app/",
                    src: "js/**/*.js",
                    dest: "temp/",
                    ext: ".min.js"
                }]
            }
        },

        //Module for encoding images and fonts within css files.
        imageEmbed: {
            font: {
                src: "node_modules/font-awesome/css/font-awesome.min.css",
                dest: "temp/fonts/font-awesome.min.css",
                options: {
                    //If true, after encoding the image/font, the image/font will remove.
                    deleteAfterEncoding : false,

                    //Set the maximum size of base64 string. 0 value means unlimited.
                    maxImageSize: 0,

                    /*preEncodeCallback: function (filename) {
                        return true;
                    }*/
                }
            }
        },

        //Module for compiling sass file to css.
        compass: {
            convert: {
                options: {
                    /*
                    Create a banner and prepend it to new js file. This option is only
                    available when specify option is set.
                    */
                    banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */",

                    //Specify the folder path that contains sass files.
                    sassDir: "app/scss/",

                    //Specify the folder path that will contain css files.
                    cssDir: "app/css/",

                    //Specify the folder path that contains images.
                    imagesDir: "app/images/",

                    //Specify the folder path that contains js files.
                    javascriptsDir: "app/js/",

                    //Specify the folder path that contains font files.
                    fontsDir: "app/lib/font-awesome/fonts/",

                    //Specify which file(s) have to compile.
                    specify: ["app/scss/styles.scss"],

                    relativeAssets: true,

                    //String form of the Compass.
                    raw: "Encoding.default_external = \'utf-8\'\n",

                    //Css output mode.
                    outputStyle: "nested",

                    //Allow to overwrite existing file.
                    force: true,

                    //Set a watcher to catch changes and re-compile the sass files.
                    //watch: true
                }
            }
        },

        //Module for compiling sass file to css.
        sass: {
            convert: {
                options: {
                    //Css output mode.
                    //style: "expanded",

                    //Avoid to create map file.
                    sourcemap: "none"
                },
                files: {
                    "app/css/styles.css": "app/scss/styles.scss"
                }
            }
        },

        //Module for removing files/folders.
        clean: {
            general: {
                files: [{
                    dot: true,
                    src: [
                        "temp",
                        ".sass-cache"
                    ]
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
                    require("autoprefixer")(),
                    require("cssnano")()
                ]
            },
            dist: {
                src: "app/css/styles.css"
            }
        },

        //Module for removing develop code of files.
        strip_code: {
            prod: {
                options: {
                    blocks: [{
                        start_block: "/* start-test-block */",
                        end_block: "/* end-test-block */"
                    }, {
                        start_block: "<!-- start-html-test-code -->",
                        end_block: "<!-- end-html-test-code -->"
                    }]
                },
                src: "www/**/*.html"
            }
        },

        //Module for minifying js files. Uglify doesn't support Javascript ES6
        htmlmin: {
            options: {
                //Removing comments.
                removeComments: true,

                //Removing all whitespace.
                collapseWhitespace: true
            },
            specific: {

                files: {
                    "www/index.html": "www/index.html",
                    "www/templates/about.html": "www/templates/about.html",
                    "www/templates/contact.html": "www/templates/contact.html",
                    "www/templates/service.html": "www/templates/service.html"
                }
            },
            general: {
                files: [{
                    expand: true,
                    cwd: "app/",
                    src: "**/*.html",
                    dest: "www",
                    ext: ".html"
                }]
            }
        }
    });


    //Load grunt modules by matchdep.
    //require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    //Load grunt modules manually.
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-open");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-image-embed");
    grunt.loadNpmTasks("grunt-contrib-compass");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-strip-code");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");


    //Set how to execute the grunt config.
    grunt.registerTask("default", [
        "clean:www",
        "imageEmbed:font",
        "compass:convert",
        "postcss",
        "cssmin:combine",
        "concat:addFontsBuild",
        "uglify:combine",
        "copy",
        "strip_code:prod",
        "htmlmin:specific",
        "clean:general"
    ]);

    grunt.registerTask("server", [
        "compass:convert",
        "concat:addFontslocal",
        "clean:general",
        "connect",
        "open",
        "watch"
    ]);
};
