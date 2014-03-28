/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";
var should = require('should');
var getCacheBackend = require("../cache-backend");

function testGetCacheBackend(options) {
  var cache = getCacheBackend(options);

  it("should be able to start a " + options.engine + " backend", function(done) {
    var payload = {"name": "uber-cache-helpers"};
    cache.set('the-key', payload, function() {
      cache.get('the-key', function(error, value) {
        if (error) {
          throw error;
        }
        should(value).eql(payload);
        done();
      });
    });
  });
}

describe("#getCacheBackend", function() {
  var engines_options = [
    {"engine": "memory"},
    {"engine": "redis"},
    {
      "engine": "memcached",
      "settings": {
        "serverLocations": ["127.0.0.1:11211"]
      }
    },
    {
      "engine": "mongodb",
      "settings": {
        "collectionName": "testCollection",
        "connectionString": "mongodb://127.0.0.1:27017/uberCache"
      }
    }
  ];

  engines_options.forEach(testGetCacheBackend);
});
