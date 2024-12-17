const express = require("express");
const upload = express.Router();
const uploadCloud = require("../middlewares/utils/cloudinary");

upload.post(
  "/cloud",
  uploadCloud.single("image"),
  (request, response, next) => {
    try {
      response.status(201).send({
        statusCode: 201,
        message: "Immagine caricata con successo",
        img: request.file.path,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = upload;
