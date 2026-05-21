
export default function errorMiddleware(err, req, res, next) {
  console.error("DEBUG ERROR:", err.message);

  let statusCode = 400; 
  let errorCode = err.message || "INTERNAL_SERVER_ERROR";

  if (errorCode === "EMAIL_ALREADY_EXISTS") {
    statusCode = 409; // Conflict resource already exists
  } else if (errorCode === "INVALID_CREDENTIALS") {
    statusCode = 401; // Unauthorized authentication failed
  } else if (errorCode === "NOT_FOUND") {
    statusCode = 404; // Not found
  }

  res.status(statusCode).json({
    success: false,
    errorCode: errorCode,
    message: errorCode.replace(/_/g, ' ').toLowerCase() 
  });
}