# pptx-compose [![Build Status](https://travis-ci.org/shobhitsharma/pptx-compose.svg?branch=master)](https://travis-ci.org/shobhitsharma/pptx-compose) [![Greenkeeper badge](https://badges.greenkeeper.io/shobhitsharma/pptx-compose.svg)](https://greenkeeper.io/)

> Parses Open Office XML generated PPTX to JSON

## Install

```
$ npm install pptx-compose
```

## Usage

```js
import PPTXCompose from "pptx-compose";

const composer = new PPTXCompose(options);

// Parses a PPTX file to JSON
const pptx = await composer.toJSON("/path/to/my.pptx");

// Parses JSON output to PPTX
const json = await composer.toPPTX("/path/to/my.json");
```

## CLI

Composer is able to generate JSON from PPTX source directly from CLI, run:

```bash
# Usage: convert [options] <input> <output>
# Options:
#   -V, --version  output the version number
#   -i, --input    PPTX File
#   -o, --output   Output JSON file (optional)
#   -h, --help     display help for command

$ node bin/convert ./path/to/my.pptx path/to/your/directory/generated.json
```

## Options

| attribute             |                                              type                                              |      default |
| --------------------- | :--------------------------------------------------------------------------------------------: | -----------: |
| **jszipBinary**       | `"nodebuffer"/ "base64"/ "text"/ "binarystring"/ "array"/ "uint8array"/ "arraybuffer"/ "blob"` | `nodebuffer` |
| **jszipGenerateType** | `"nodebuffer"/ "base64"/ "text"/ "binarystring"/ "array"/ "uint8array"/ "arraybuffer"/ "blob"` | `nodebuffer` |

## Methods

PPTX Composer has following built-in methods:

### .toJSON()

Parse PowerPoint file to JSON.

```js
const composer = new PPTXCompose();

// Parses a PPTX file to JSON
const pptx = await composer.toJSON("/path/to/my.pptx");

// Convert a PPTX file to JSON file
composer.toJSON("/path/to/my.pptx", {
  output: "/path/to/output/file.pptx",
});
```

### .toPPTX()

Convert JSON file to PPTX.

```js
const composer = new PPTXCompose();

// Parses JSON output to PPTX
const json = await composer.toPPTX("/path/to/my.json");

// Convert JSON to PPTX file
composer.toJSON("/path/to/my.json", {
  output: "/path/to/output/file.pptx",
});
```

## License

MIT
