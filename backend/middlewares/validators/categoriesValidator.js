const { body, validationResult } = require("express-validator");

const categoriesValidator = [
  body("slug").isString().notEmpty().withMessage("Inserisci un slug"),
  body("title").isString().notEmpty().withMessage("Inserisci un titolo"),
  body("titleExtended")
    .isString()
    .notEmpty()
    .withMessage("Inserisci un titolo esteso"),
  body("subtitle")
    .isString()
    .notEmpty()
    .withMessage("Inserisci un sottotitolo"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Inserisci una descrizione"),
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

module.exports = categoriesValidator;
