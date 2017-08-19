'use strict';

var assert = require('assert');
var Buffer = require('buffer').Buffer;
var Composer = require('../index.js');

describe('Composer Library', function () {
  this.timeout(5000);

  var compose = new Composer();
  var sample_pptx = __dirname + '/sample.pptx';

  it('.parse() should a PPTX file', function (done) {
    compose.parse(sample_pptx, done);
  });

  it('.execute() should multiple PPTX files', function (done) {
    compose.execute([sample_pptx], done);
  });

  it('.bufferize() should a PPTX file', function (done) {
    compose.parse(sample_pptx, function (err, content) {
      if (err) {
        return done(err);
      }
      compose.bufferize(content, function (err, response) {
        if (err) {
          return done(err);
        }
        return new Promise(function (resolve) {
            assert.ok(Buffer.isBuffer(response), '`response` is not typeof Buffer');
            resolve();
          })
          .then(done);
      });
    });
  });

  it('.toJSON() should convert PPTX file to JSON', function (done) {
    compose.toJSON(sample_pptx, done);
  });
});
