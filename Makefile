all: clean test dist/tag-editor.js dist/tag-editor.min.js lint

watch:
	@make -j run-dev-server

dist/tag-editor.min.js: node_modules dist/tag-editor.js
	@node_modules/.bin/uglifyjs dist/tag-editor.js -cm --comments -o $@

dist/tag-editor.js: node_modules src/tag-editor.js dist
	@perl -i -pe 's/(\* \@version ).*$$/\1$(shell node -e 'console.log("v" + require("./package.json").version)')/' src/tag-editor.js
	@node_modules/.bin/browserify -t undebuggify src/tag-editor.js -s TagEditor -o $@

test: node_modules
	@node_modules/.bin/tape -r babel-register test/test.js

lint: node_modules
	@node_modules/.bin/eslint src/**/*.js

dist:
	@mkdir -p dist

clean:
	@rm -rf dist

run-dev-server: node_modules
	@node_modules/.bin/budo src/tag-editor.js:dist/tag-editor.js -- -s TagEditor

node_modules: package.json
	@npm i

.PHONY: all watch test lint clean run-dev-server
