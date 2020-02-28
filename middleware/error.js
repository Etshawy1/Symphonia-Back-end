const createError = require('http-errors');

module.exports = function (app) {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    __logger.error(err.message, err);

    // render the error page
    res.status(err.status || 500);
    res.end('error');
  });
};
