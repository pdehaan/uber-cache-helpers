/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var uberCache = require('uber-cache');

var engines = {
  memory: "uber-cache/lib/memory-engine",
  mongodb: "./proxies/mongodb",
  redis: "uber-cache-redis",
  memcached: "uber-cache-memcached"
}


function getCacheBackend(options) {
  if (!options.hasOwnProperty("engine")) {
    throw new Error("You must to specify the engine.");
  }

  var enginesAvailable = Object.keys(engines);
  if (enginesAvailable.indexOf(options.engine) === -1) {
    throw new Error("We don't know this " + options.engine +
                    " backend. Should be one of: " + enginesAvailable);
  }

  var DatabaseBackend = require(engines[options.engine])

  try {
    var engine = DatabaseBackend(options.settings || {});
  } catch (err) {
    throw new Error("You need to install '" + options.engine +
                    "' dependencies: " + err);
  }

  return uberCache({engine: engine});
}

module.exports = getCacheBackend;
