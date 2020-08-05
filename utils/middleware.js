const unknownEndPointHandler = (_req, res) => {
  res.status(404).send({ error: "Unknown Endpoint" });
};

const errorHandler = (error, _request, response, next) => {
  console.log(error.name);

  switch (error.name) {
    case "CastError":
      return response.status(400).send({ message: "malformatted id" });
    case "ValidationError":
      return response.status(400).send({ message: error.message });
    case "NotFoundError":
      return response.status(error.statusCode).send({ message: error.message });
    default:
      next(error);
  }
};

module.exports = {
  unknownEndPointHandler,
  errorHandler,
};
