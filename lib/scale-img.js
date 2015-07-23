var gm = require('gm');
var async = require('async');
var log = require('debug')('scale-img');

module.exports = function scaleImg(srcImg, destImg, scale, cb) {
  log('scale img: ' + srcImg);
  var img = gm(srcImg);
  async.waterfall([
    function (callback) {
      img.size(callback);
    }, function (size, callback) {
      img.resize(size.width * scale, size.height * scale)
        .write(destImg, callback);
    }
  ], function (err, result) {
    if (err) {
      log(new Error(err));
    }
    cb(err);
  });
};