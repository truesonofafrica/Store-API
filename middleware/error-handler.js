const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong. Try again later!';
  return res.status(statusCode).json({ message: message });
};

module.exports = errorHandlerMiddleware;
