function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);

  res.status(404);

  next(error);
}

function errorHandler(err, req, res, next) {
  console.error(err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (err.name === "ValidationError") {
    statusCode = 400;
  }

  if (err.name === "CastError") {
    statusCode = 400;
  }

  if (err.code === 11000) {
    statusCode = 409;
  }

  res.status(statusCode).json({
    success: false,
    message:
      err.code === 11000
        ? "A course with this information already exists."
        : err.message || "Something went wrong.",
  });
}

module.exports = {
  notFound,
  errorHandler,
};