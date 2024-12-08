const { body, validationResult } = require("express-validator");

const coursesPageValidator = [
  body("heroImage")
    .isString()
    .optional()
    .withMessage("L'immagine principale è obbligatoria"),
  body("sloganTitle")
    .isString()
    .optional()
    .withMessage("Il titolo è obbligatorio"),
  body("iconFirstNumber")
    .isString()
    .optional()
    .withMessage("Il numero è obbligatorio"),
  body("iconFirstTitle")
    .isString()
    .optional()
    .withMessage("Il titolo è obbligatorio"),
  body("iconSecondNumber")
    .isString()
    .optional()
    .withMessage("Il numero è obbligatorio"),
  body("iconSecondTitle")
    .isString()
    .optional()
    .withMessage("Il titolo è obbligatorio"),
  body("iconThirdNumber")
    .isString()
    .optional()
    .withMessage("Il numero è obbligatorio"),
  body("iconThirdTitle")
    .isString()
    .optional()
    .withMessage("Il titolo è obbligatorio"),
  body("firstSubtitle")
    .isString()
    .optional()
    .withMessage("Il sottotitolo è obbligatorio"),
  body("firstDescription")
    .isString()
    .optional()
    .withMessage("La descrizione è obbligatoria"),
  body("gallerySlider").isArray().optional(),
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

module.exports = coursesPageValidator;
