const { body, validationResult } = require("express-validator");

const usersValidator = [
  body("username").isString().notEmpty().withMessage("Username è obbligatorio"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("La password deve avere almeno 6 caratteri"),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      const error = new Error("Errore di validazione");
      error.statusCode = 400;
      error.details = errors.array();
      return next(error);
    }
    next();
  },
];

module.exports = usersValidator;
