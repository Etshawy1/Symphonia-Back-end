/**
 * @returns {String} a random string
 * @param {Number} length the length of the random string you want
 */
module.exports.randomStr = function(length) {
  let radom13chars = function() {
    return Math.random()
      .toString(16)
      .substring(2, 15);
  };
  let loops = Math.ceil(length / 13);
  return new Array(loops)
    .fill(radom13chars)
    .reduce((string, func) => {
      return string + func();
    }, '')
    .substring(0, length);
};

module.exports.getPageMeta = req => {
  let limit = 20; // the default
  let offset = 0; // the default
  if (req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  return { limit, offset };
};
