/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var MongoClient = require('mongodb').MongoClient,
    mongodbEngine = require('uber-cache-mongodb'), 
    uberCache = require('uber-cache'),
    EventEmitter = require('events').EventEmitter;


var mongoProxy = function(settings) {
  var _cache,
      _settings = settings || {};

  if (!_settings.hasOwnProperty('connectionString')) {
    throw new Error("The connectionString settings is required");
  }

  var connectionString = _settings.connectionString;

  if (!_settings.hasOwnProperty('collectionName')) {
    console.log(_settings);
    throw new Error("The collectionName settings is required");
  }

  var collectionName = _settings.collectionName;
  var handle = new EventEmitter();

  function _ensureConnected(callback) {
    var db, engine;

    if (_cache) {
      callback(null, _cache);
      return;
    }

    MongoClient.connect(connectionString, function(err, resultDb) {
      if (err) {
        callback(err);
        return;
      }
      db = resultDb;
      engine = mongodbEngine(db, {collection: collectionName});
      _cache = uberCache({engine: engine});

      engine.on('miss', function(key) {
        handle.emit('miss', key);
      });;

      engine.on('stale', function (key, value, ttl) {
        handle.emit('stale', key, value, ttl);
      })

      callback(null, _cache);
    });
  }

  handle.uberCacheVersion = '1';

  handle.set = function(key, value, ttl, callback) {
    _ensureConnected(function(err, cache) {
      return cache.set(key, value, ttl, callback);
    });
  };

  handle.get = function(key, callback) {
    _ensureConnected(function(err, cache) {
      return cache.get(key, callback);
    });
  };

  handle.del = function(key, callback) {
    _ensureConnected(function(err, cache) {
      return cache.del(key, callback);
    });      
  };

  handle.clear = function(callback) {
    _ensureConnected(function(err, cache) {
      return cache.clear(callback);
    });      
  };

  handle.size = function(callback) {
    _ensureConnected(function(err, cache) {
      return cache.size(callback);
    });      
  };

  return handle;
};


module.exports = mongoProxy;
