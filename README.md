# pptx-compose [![Build Status](https://travis-ci.org/shobhitsharma/pptx-compose.svg?branch=master)](https://travis-ci.org/shobhitsharma/pptx-compose)

> Parses Open Office XML generated PPTX to JSON


## Install

```
$ npm install pptx-compose
```

## Usage

```js
var composer = require('pptx-compose');

// Parse a PPTX file
composer.parse('/path/to/pptx/file.pptx', callback[Function()])
```

## Methods

PPTX Composer has following built-in methods:

### .parse()

Parse a single PPTX file.

```js
composer.parse('/path/to/pptx/file.pptx', function (err, json) {
  console.log(JSON.stringify(json, null, 2));
});
```

### .bufferize()

Converts JSON (with PPTX XML) into buffer or file.

```js
composer.bufferize('/path/to/pptx/file.pptx', options[object{}], callback[Function()])
```

### .execute()

Executes parsing of multiple PPTX files and returning results as array

```js

var files = [
  '/path/to/pptx/file1.pptx',
  '/path/to/pptx/file2.pptx'
];

var options = {
  file: true // Returns a PPTX file. (`false` as default to return buffer)
};

composer.execute(files, options, function (err, results) {
  console.log(results);
});
```
