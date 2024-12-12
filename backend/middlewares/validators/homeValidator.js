const { body, validationResult } = require("express-validator");

const homePageValidator = [
  body("heroSlider")
    .isArray()
    .withMessage("Il hero slider deve essere un array di immagini")
    .optional(),
  body("firstIncipit")
    .isString()
    .optional()
    .withMessage("Il primo incipit è obbligatorio"),
  body("logo").isString().optional().withMessage("Il logo è obbligatorio"),
  body("firstDescription")
    .isString()
    .optional()
    .withMessage("La prima descrizione è obbligatoria"),
  body("sloganSubtitle")
    .isString()
    .optional()
    .withMessage("Il sottotitolo dello slogan è obbligatorio"),
  body("sloganTitle")
    .isString()
    .optional()
    .withMessage("Il titolo dello slogan è obbligatorio"),
  body("secondDescription")
    .isString()
    .optional()
    .withMessage("La seconda descrizione è obbligatoria"),
  body("scrollText")
    .isString()
    .optional()
    .withMessage("Il testo di scorrimento è obbligatorio"),
  body("ctaTitle")
    .isString()
    .optional()
    .withMessage("Il titolo del CTA è obbligatorio"),
  body("ctaDescription")
    .isString()
    .optional()
    .withMessage("La descrizione del CTA è obbligatoria"),
  body("ctaButton")
    .isString()
    .optional()
    .withMessage("Il bottone del CTA è obbligatorio"),
  body("ctaLink")
    .isString()
    .optional()
    .withMessage("Il link del CTA è obbligatorio"),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).send({
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = homePageValidator;
