const { body, validationResult } = require("express-validator");

const courseValidator = [
  body("slug").isString().notEmpty().withMessage("Inserisci un slug"),
  body("category").isString().notEmpty().withMessage("Inserisci una categoria"),
  body("heroImage")
    .isString()
    .notEmpty()
    .withMessage("Inserisci un'immagine principale"),
  body("title").isString().notEmpty().withMessage("Inserisci un titolo"),
  body("titleExtended")
    .isString()
    .notEmpty()
    .withMessage("Inserisci un titolo esteso"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Inserisci una descrizione"),
  body("highlightedText")
    .isString()
    .notEmpty()
    .withMessage("Inserisci un testo evidenziato"),
  body("levels.title")
    .isString()
    .notEmpty()
    .withMessage("Inserisci un titolo del livello"),
  body("levels.description")
    .isString()
    .notEmpty()
    .withMessage("Inserisci una descrizione del livello"),
  body("levels.programListTitle")
    .isString()
    .notEmpty()
    .withMessage("Inserisci un titolo della lista del programma"),
  body("levels.programListItems")
    .isArray()
    .withMessage("La lista degli elementi del programma deve essere un array")
    .notEmpty()
    .withMessage("La lista degli elementi del programma non può essere vuota"),
  body("levels.GROUP.price")
    .isNumeric()
    .withMessage("Il prezzo del corso di gruppo deve essere un numero"),
  body("levels.GROUP.duration")
    .isString()
    .notEmpty()
    .withMessage("La durata del corso di gruppo è obbligatoria"),
  body("levels.GROUP.description")
    .isString()
    .notEmpty()
    .withMessage("La descrizione del corso di gruppo è obbligatoria"),
  body("levels.SINGLE.price")
    .isNumeric()
    .withMessage("Il prezzo del corso singolo utente deve essere un numero"),
  body("levels.SINGLE.duration")
    .isString()
    .notEmpty()
    .withMessage("La durata del corso singolo utente è obbligatoria"),
  body("levels.SINGLE.description")
    .isString()
    .notEmpty()
    .withMessage("La descrizione del corso singolo utente è obbligatoria"),
  body("levels.FRIENDS.price")
    .isNumeric()
    .withMessage("Il prezzo per il corso porta un amico deve essere un numero"),
  body("levels.FRIENDS.duration")
    .isString()
    .notEmpty()
    .withMessage("La durata per il corso porta un amico è obbligatoria"),
  body("levels.FRIENDS.description")
    .isString()
    .notEmpty()
    .withMessage("La descrizione per il corso porta un amico è obbligatoria"),
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

module.exports = courseValidator;
