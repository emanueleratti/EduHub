const errorHandler = (error, request, response, next) => {
  const errorStatus = error.statusCode || 500;
  const errorMessage =
    error.message || "Si è verificato un errore interno del server.";

  response.status(errorStatus).send({
    statusCode: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
};

module.exports = errorHandler;
