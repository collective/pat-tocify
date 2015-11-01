require.config({
    paths: {
        "console-runner":    "../node_modules/phantom-jasmine/lib/console-runner",
        "jasmine":           "../src/bower_components/jasmine/lib/jasmine-core/jasmine",
        "jasmine-html":      "../src/bower_components/jasmine/lib/jasmine-core/jasmine-html",
        "jquery":            "../src/bower_components/jquery/dist/jquery",
        "jquery.browser":    "../src/bower_components/jquery.browser/dist/jquery.browser",
        "jquery-ui":         "../src/bower_components/jquery-ui/ui",
        "logging":           "../src/bower_components/logging/src/logging",
        "pat-base":          "../src/bower_components/patternslib/src/core/base",
        "pat-compat":        "../src/bower_components/patternslib/src/core/compat",
        "pat-jquery-ext":    "../src/bower_components/patternslib/src/core/jquery-ext",
        "pat-logger":        "../src/bower_components/patternslib/src/core/logger",
        "pat-mockup-parser": "../src/bower_components/patternslib/src/core/mockup-parser",
        "pat-parser":        "../src/bower_components/patternslib/src/core/parser",
        "pat-registry":      "../src/bower_components/patternslib/src/core/registry",
        "pat-utils":         "../src/bower_components/patternslib/src/core/utils",
        "tocify":            "../src/bower_components/jquery.tocify.js/src/javascripts/jquery.tocify",
        "underscore":        "../src/bower_components/underscore/underscore",
        "pat-tocify":        "../src/pat-tocify"
    },
    shim: {
        "jasmine-html": {
            deps: ["jasmine"],
            exports: "jasmine"
        },
        "jquery": {
            exports: "jQuery"
        },
        "jquery.fullcalendar.dnd": {
            deps: ["jquery"]
        },
        "tocify": ["jquery-ui/widget"]
    }
});

define("TestRunner", function() {
    require([
        "jasmine-html",
        "logging",
        "pat-tocify"
    ], function(jasmine) {
        require([
            "console-runner",
            "specs/tocify.js"
        ], function() {
            var jasmineEnv = jasmine.getEnv();
            var reporter;
            if (/PhantomJS/.test(navigator.userAgent)) {
                reporter = new jasmine.ConsoleReporter();
                window.console_reporter = reporter;
                jasmineEnv.addReporter(reporter);
                jasmineEnv.updateInterval = 0;
            } else {
                reporter = new jasmine.HtmlReporter();
                jasmineEnv.addReporter(reporter);
                jasmineEnv.specFilter = function(spec) {
                    return reporter.specFilter(spec);
                };
                jasmineEnv.updateInterval = 0; // Make this more to see what's happening
            }
            jasmineEnv.execute();
        });
    });
});
require(["TestRunner"]);
