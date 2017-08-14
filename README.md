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

// Parse multiple PPTX files
composer.execute(['/path/to/pptx/file1.pptx', '/path/to/pptx/file2.pptx'], callback[Function()])

// Compose a PPTX file
composer.bufferize('/path/to/pptx/file.pptx', options[object{}], callback[Function()])
```
