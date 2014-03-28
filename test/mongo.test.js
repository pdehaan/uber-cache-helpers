/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var _ = require('lodash');

require('uber-cache/test/engine')('mongodbProxyEngine', function(options) {

  options = _.extend({
    connectionString: "mongodb://127.0.0.1:27017/uber-cache-test",
    collectionName: "tests"
  }, options);

  var engine = require('../proxies/mongodb')(options);

  engine.clear();

  return engine;
});
