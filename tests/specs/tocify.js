define(["pat-tocify"], function(pattern) {

    describe("pat-tocify", function() {

        beforeEach(function() {
            $("<div/>", {id: "lab"}).appendTo(document.body);
        });

        afterEach(function() {
            $("#lab").remove();
        });

        describe("init", function() {
            it("Initialise tocify", function() {

                $.ajax({
                    url: "/test_content.txt"
                }).done(function(data){
                    $("#lab").html(data);
                    var $contents = $("#toc.pat-tocify");
                    pattern.init($contents);
                    var toc_init = $contents.hasClass("tocify");
                    expect(toc_init).toBe(true);
                    $("lab").empty();
                });
            });
        });
    });

});

// jshint indent: 4, browser: true, jquery: true, quotmark: double
// vim: sw=4 expandtab
