class ErrorResponse extends Error {
  /**
   * Create custom ErrorResponse
   * @param {string} message Error message
   * @param {number} statusCode HTTP status code
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguish operational errors from programming errors
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error handler middleware
 * @param {Error} err Error object
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Log error to console for development
  console.error(err.stack.red);

  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value entered for ${field}`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Not authorized, token failed";
    error = new ErrorResponse(message, 401);
  }

  // JWT expired
  if (err.name === "TokenExpiredError") {
    const message = "Token has expired";
    error = new ErrorResponse(message, 401);
  }

  // Multer file size limit exceeded
  if (err.code === "LIMIT_FILE_SIZE") {
    const message = "File size too large";
    error = new ErrorResponse(message, 400);
  }

  // Multer file type not supported
  if (err.code === "FILE_TYPE_NOT_SUPPORTED") {
    const message = "File type not supported";
    error = new ErrorResponse(message, 400);
  }

  // Default to 500 server error
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export {
  ErrorResponse,
  errorHandler,
};