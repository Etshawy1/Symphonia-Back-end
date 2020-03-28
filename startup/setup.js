// the file is used for the essential setups

module.exports = function() {
  process.env.LOCAL_HOST = process.env.LOCAL_HOST.replace(
    '<PORT>',
    process.env.PORT
  );
};
