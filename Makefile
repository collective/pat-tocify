# vim: set noexpandtab:
# Makefile needs to set tabs instead of spaces
BOWER       ?= node_modules/.bin/bower
HTTPSERVE   ?= node_modules/.bin/http-server
JSHINT 		?= node_modules/.bin/jshint
PHANTOMJS	?= node_modules/.bin/phantomjs
SOURCES	= $(wildcard src/*.js)

all:: install serve
	printf "\n\n All done!\n\n Go to http://localhost:4001/ to see a demo.\n\n\n\n"

install:: stamp-npm stamp-bower

serve::
	$(HTTPSERVE) -p 4001

clean::
	rm -f stamp-npm stamp-bower
	rm -rf node_modules src/bower_components ~/.cache/bower

stamp-npm: package.json
	npm install
	touch stamp-npm

stamp-bower: stamp-npm
	$(BOWER) install
	touch stamp-bower

jshint: stamp-npm
	$(JSHINT) --config .jshintrc $(SOURCES)

check:: jshint
	$(PHANTOMJS) node_modules/phantom-jasmine/lib/run_jasmine_test.coffee tests/TestRunner.html

.PHONY: all clean install serve stamp-bower stamp-npm jshint check
