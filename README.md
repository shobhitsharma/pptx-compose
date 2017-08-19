# pptx-compose [![Build Status](https://travis-ci.org/shobhitsharma/pptx-compose.svg?branch=master)](https://travis-ci.org/shobhitsharma/pptx-compose)

> Parses Open Office XML generated PPTX to JSON


## Install

```
$ npm install pptx-compose
```

## Usage

```js
const composer = require('pptx-compose');

// Parses a PPTX file
composer.parse('/path/to/pptx/file.pptx', (err, content)=>{})
```

## CLI

Composer is able to generate JSON from PPTX source and saves result to `./output` directory, run:

```bash
$ node bin/convert ./path/to/my/pptx
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

Converts generated JSON (via parse method) into buffer or file. The data array can be manipulated based on your requirements in case you need to add theme, slides or other xml data.

```js
var parsed_xmls = [xml1, xml2, xml3];
var options = {
  file: true // Returns a PPTX file. (`false` as default to return buffer)
};

composer.bufferize(parsed_xmls, options, (err, data)=>{});
```

### .execute()

Executes parsing of multiple PPTX files and returning results as array.

```js
var files = [
  '/path/to/pptx/file1.pptx',
  '/path/to/pptx/file2.pptx'
];

composer.execute(files, function (err, results) {
  console.log(results);
});
```

## License
MIT
