# uber-cache-helpers

The aim of uber-cache-helpers is to give a set of tools that lets the
user choose a backend store directly from its application
configuration.

## Available backends

We have four backends at the moment:

 * Memory
 * Redis
 * Mongodb
 * Memcached


### Configure the Memory backend

```javascript
var options = {"engine": "memory"};
```

### Configure the Redis backend

```javascript
var options = {
  "engine": "redis",
  "settings": {
    "port": 6379,
    "host": "127.0.0.1",
    "db": "0"
  }
};
```

These are default values, so you can also simply use:

```javascript
var options = {"engine": "redis"};
```

### Configure the Memcached backend

```javascript
var options = {
  "engine": "memcached",
  "settings": {
    "serverLocations": ["127.0.0.1:11211"]
  }
};
```

These are default values, so you can also simply use:

```javascript
var options = {"engine": "memcached"};
```

### Configure the MongoDB backend

```javascript
var options = {
  "engine": "mongodb",
  "settings": {
    "collectionName": "testCollection",
    "connectionString": "mongodb://127.0.0.1:27017/uberCache"
  }
};
```

## Get your Uber-Cache instance from the configuration

The aim of all of this is to be able to change the configuration and
just have the same Uber-Cache API for all of them.

```javascript
var getCacheBackend = require("uber-cache-helpers").getCacheBackend;

var cache = getCacheBackend(options);

cache.set("the key", "the value", function () {
  cache.get("the key", function (error, value) {
    console.log(value);
  });
});
```

And that's just it!

You can also get access directly to then engine using `cache.engine`:

```javascript
cache.engine.close();
```
