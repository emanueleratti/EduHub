const badRequestHandler = (error, request, response, next) => {
  if (error.statusCode === 400) {
    response.status(400).send({
      statusCode: 400,
      message: error.message || "Bad Request",
    });
  } else {
    next(error);
  }
};

module.exports = badRequestHandler;
