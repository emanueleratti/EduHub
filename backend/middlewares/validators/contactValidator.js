const { body, validationResult } = require("express-validator");

const contactValidator = [
  body("name").isString().notEmpty().withMessage("Nome è obbligatorio"),
  body("email")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Email è obbligatoria"),
  body("message").isString().notEmpty().withMessage("Messaggio è obbligatorio"),
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

module.exports = contactValidator;
