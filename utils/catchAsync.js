module.exports = fn => {
  return (req, res, next) => {
    // catch rejected promise to the global error handling middleware
    fn(req, res, next).catch(next);
  };
};
