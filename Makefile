NODE_LOCAL_BIN=./node_modules/.bin

.PHONY: test
test: lint mocha

install:
	@npm install

.PHONY: lint
lint: jshint

clean:
	rm -rf node_modules

.PHONY: jshint
jshint:
	@$(NODE_LOCAL_BIN)/jshint index.js

.PHONY: mocha
mocha:
	@$(NODE_LOCAL_BIN)/mocha test/ --reporter spec