require.config({
    baseUrl: "src",
    paths: {
        // Add any other dependencies here. For external libraries, also add
        // them to bower.json
        "jquery":                       "bower_components/jquery/dist/jquery",
        "jquery.browser":               "bower_components/jquery.browser/dist/jquery.browser",
        "jquery-ui":                    "bower_components/jquery-ui/ui",
        "logging":                      "bower_components/logging/src/logging",
        "pat-base":                     "bower_components/patternslib/src/core/base",
        "pat-compat":                   "bower_components/patternslib/src/core/compat",
        "pat-jquery-ext":               "bower_components/patternslib/src/core/jquery-ext",
        "pat-logger":                   "bower_components/patternslib/src/core/logger",
        "pat-mockup-parser":            "bower_components/patternslib/src/core/mockup-parser",
        "pat-parser":                   "bower_components/patternslib/src/core/parser",
        "pat-registry":                 "bower_components/patternslib/src/core/registry",
        "pat-utils":                    "bower_components/patternslib/src/core/utils",
        "tocify":                       "bower_components/jquery.tocify.js/src/javascripts/jquery.tocify",
        "underscore":                   "bower_components/underscore/underscore"
    },
    "shim": {
        "logging": { "exports": "logging" },
        // tell Require.js that jquery.tocify.js depends on the jQueryUI Widget
        "tocify": ["jquery-ui/widget"]
    }
});

require(["pat-registry", "pat-tocify"], function(registry, pattern) {
    // your pattern is found via it's name in the filesystem, starting from the
    // requireJS baseUrl option: "pat-tocify"
    window.patterns = registry;
    $(document).ready(function() {
        registry.init();
    });
});
