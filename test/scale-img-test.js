var expect = require('chai').expect;
var scaleImg = require('../lib/scale-img.js');
var gm = require('gm');
var fs = require('fs');
var del = require('del');

describe('scale-img', function() {
  before(function() {
    del.sync('test/tmp-result-res');
    fs.mkdirSync('test/tmp-result-res');
  });

  it('scale img file test', function(done) {
    var destFile = 'test/tmp-result-res/beerUI.png';
    scaleImg('test/res/beerUI.png', destFile, 0.5, function(err) {
      expect(err).not.exist;

      gm(destFile).size(function(err, size) {
        expect(err).not.exist;
        expect(size.width).to.equal(84);
        expect(size.height).to.equal(86);
        done();
      });
    });
  });

  it('scale not exit png test', function(done) {
    scaleImg('test/res/notexit.png', 'test/tmp-result-res/beerUI.png', 0.5, function(err) {
      expect(err).not.be.null;
      done();
    });
  })
});