'use strict';

var assert = require('assert');
var Composer = require('../index.js');

describe('Composer features', function () {
  this.timeout(5000);

  var compose = new Composer();
  var sample_pptx = __dirname + '/sample.pptx';

  it('should .parse() a PPTX file', function (done) {
    compose.parse(sample_pptx, done);
  });

  it('should .execute() multiple PPTX files', function (done) {
    compose.execute([sample_pptx], done);
  });
});
