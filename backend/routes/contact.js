const express = require("express");
const contact = express.Router();
const contactSchema = require("../models/contactSchema");
const contactValidator = require("../middlewares/validators/contactValidator");

// GET
contact.get("/", async (request, response, next) => {
  try {
    const contacts = await contactSchema.find();

    if (contacts.length === 0) {
      return response.status(404).send({
        statusCode: 404,
        message: "Nessun contatto trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Lista Contatti recuperata con successo",
      contacts: contacts,
    });
  } catch (error) {
    next(error);
  }
});

// GET SLUG
contact.get("/:slug", async (request, response, next) => {
  try {
    const contact = await contactSchema.findOne({
      slug: request.params.slug,
    });

    if (!contact) {
      return response.status(404).send({
        statusCode: 404,
        message: "Contatto non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Contatto recuperato con successo",
      contact,
    });
  } catch (error) {
    next(error);
  }
});

// POST
contact.post("/create", async (request, response, next) => {
  try {
    const newContact = new contactSchema(request.body);
    const contact = await newContact.save();

    response.status(201).send({
      statusCode: 201,
      message: "Contatto creato con successo",
      contact,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH
contact.patch("/update/:id", async (request, response, next) => {
  try {
    const updatedContact = await contactSchema.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return response.status(404).send({
        statusCode: 404,
        message: "Contatto non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Contatto aggiornato con successo",
      contact: updatedContact,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE
contact.delete("/delete/:id", async (request, response, next) => {
  try {
    const deletedContact = await contactSchema.findByIdAndDelete(
      request.params.id
    );

    if (!deletedContact) {
      return response.status(404).send({
        statusCode: 404,
        message: "Contatto non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Contatto eliminato con successo",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = contact;
