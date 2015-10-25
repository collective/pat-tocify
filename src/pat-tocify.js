/* Tocify pattern
*
* Options:
*    context(string): Any valid jQuery selector. ("body")
*    selectors(string): The selectors used to build the table of contents. ("h1,h2,h3")
*    showAndHide(boolean): Expand and collapse sub headings. (true)
*    showEffect(string): "none", "fadeIn", "show", or "slideDown", or any of the other jQuery show effects. ("slideDown")
*    showEffectSpeed(string or integer): "slow", "medium", "fast", or milliseconds. ("medium")
*    hideEffect(string): "none", "fadeOut", "hide", "slideUp", or any of the jQuery hide effects. ("none")
*    hideEffectSpeed(string or integer): "slow", "medium", "fast" or milliseconds. ("medium")
*    smoothScroll(boolean): true or false. (true)
*    smoothScrollSpeed(string or integer): Accepts Number (milliseconds) or String: "slow", "medium", or "fast". ("medium")
*    scrollTo(integer or function): Accepts any number of pixels or function. (0)
*    showAndHideOnScroll(boolean): true or false. (true)
*    highlightOnScroll(boolean): true or false. (true)
*    highlightOffset(number): Accepts any number of pixels. (40)
*    theme(string): The theme "bootstrap", "jqueryui", or "none". ("bootstrap")
*    extendPage(boolean): true or false. (true)
*    extendPageOffset(integer): Any number of pixels. (100)
*    history(boolean): true or false (true)
*    hashGenerator(string or function): "compact", "pretty", function(text, element){}. Compact - #CompressesEverythingTogether. Pretty - #looks-like-a-nice-url-and-is-easily-readable. function(text, element){} - Your own hash generation function that accepts the text as an argument, and returns the hash value. ("compact")
*    highlightDefault(boolean): true or false. (true)
*    ignoreSelector(string): Any valid jQuery selector. (null)
*    scrollHistory(boolean): true or false. (false)
*
* Documentation:
*   # Tocify
*
*   This pattern creates a table of contents using jquery.tocify.js
*   (see http://gregfranko.com/jquery.tocify.js for more information about
*   tocify).
*
*   # Default text example
*
*   {{ example-1 }}
*
*   # Custom options example
*
*   {{ example-2 }}
*
* Example: example-1
*    <div class="pat-tocify"></div>
*
* Example: example-2
*    <div class="pat-tocify" data-pat-tocify='{"selectors": "h2, h3"}'></div>
*
*/

(function (root, factory) {
    // We use AMD (Asynchronous Module Definition) or browser globals to create
    // this module.
    if (typeof define === "function" && define.amd) {
        define([
            "jquery",
            "pat-base",
            "pat-registry",
            "pat-parser",
            "pat-logger",
            "tocify",
            "jquery-ui/widget"
        ], function() {
            return factory.apply(this, arguments);
        });
    } else {
        // If require.js is not available, you'll need to make sure that these
        // global variables are available.
        factory($, patterns.Base, patterns, patterns.Parser, patterns.logger);
    }
}(this, function($, Base, registry, Parser, logger) {
    "use strict";

    var log = logger.getLogger("pat-tocify");
    /* For logging, you can call log.debug, log.info, log.warn, log.error and log.fatal.
     *
     * For more information on how to use the logger and how to view log messages, please read:
     * https://github.com/Patternslib/logging
     */
    log.debug("pat-tocify loaded");
    var parser;
    parser = new Parser("tocify");
    /* If you'd like your pattern to be configurable via the
     * data-pat-tocify attribute, then you need to
     * specify the available arguments here, by calling parser.addArgument.
     *
     * The addArgument method takes the following parameters:
     *  - name: The required name of the pattern property which you want to make
     *      configurable.
     *  - default_value: An optional default string value of the property if the user
     *      doesn't provide one.
     *  - choices: An optional set (Array) of values that the property might take.
     *      If specified, values outside of this set will not be accepted.
     *  - multiple: An optional boolean value which specifies whether the
     *      property can be multivalued or not.
     *
     *  For example:
     *      parser.addArgument('color', 'blue', ['red', 'green', 'blue'], false);
     */
    parser.addArgument("context", "body");
    parser.addArgument("selectors", "h1,h2,h3");
    parser.addArgument("showAndHide", true);
    parser.addArgument("showEffect", "slideDown");
    parser.addArgument("showEffectSpeed", "medium");
    parser.addArgument("hideEffect", "none");
    parser.addArgument("hideEffectSpeed", "medium");
    parser.addArgument("smoothScroll", true);
    parser.addArgument("smoothScrollSpeed", "medium");
    parser.addArgument("scrollTo", 0);
    parser.addArgument("showAndHideOnScroll", true);
    parser.addArgument("highlightOnScroll", true);
    parser.addArgument("highlightOffset", 40);
    parser.addArgument("theme", "bootstrap");
    parser.addArgument("extendPage", true);
    parser.addArgument("extendPageOffset", 100);
    parser.addArgument("history", true);
    parser.addArgument("hashGenerator", "compact");
    parser.addArgument("highlightDefault", true);
    parser.addArgument("ignoreSelector", null);
    parser.addArgument("scrollHistory", false);

    return Base.extend({
        /* The name is used to store the pattern in a registry and needs to be
         * unique.
         */
        name: "tocify",
        /* The trigger specifies the selector (CSS or jQuery) which Patternslib
         * will scan for in order to identify and initialize this pattern.
         */
        trigger: ".pat-tocify",

        init: function initUndefined () {
            this.options = parser.parse(this.$el);
            /* this.options will now contain the configured pattern properties
             * you've registered with the parser.addArgument method.
             *
             * If the user provided any values via the data-pat-tocify
             * attribute, those values will already be set.
             */
            this.$el.tocify(this.options);
            log.debug("pat-tocify initialized");
        }
    });
}));
