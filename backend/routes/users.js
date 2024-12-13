const express = require("express");
const users = express.Router();
const usersSchema = require("../models/usersSchema");
const usersValidator = require("../middlewares/validators/usersValidator");

// GET
users.get("/", async (request, response, next) => {
  try {
    const users = await usersSchema.find();

    if (users.length === 0) {
      return response.status(404).send({
        statusCode: 404,
        message: "Nessun utente trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Lista utenti recuperata con successo",
      users: users,
    });
  } catch (error) {
    next(error);
  }
});

// GET SLUG
users.get("/:slug", async (request, response, next) => {
  try {
    const user = await usersSchema.findOne({
      slug: request.params.slug,
    });

    if (!user) {
      return response.status(404).send({
        statusCode: 404,
        message: "Utente non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Utente recuperato con successo",
      user,
    });
  } catch (error) {
    next(error);
  }
});

// POST
users.post("/create", async (request, response, next) => {
  try {
    const newUser = new usersSchema(request.body);
    const user = await newUser.save();

    response.status(201).send({
      statusCode: 201,
      message: "Utente creato con successo",
      user,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH
users.patch("/update/:id", async (request, response, next) => {
  try {
    const updatedUser = await usersSchema.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return response.status(404).send({
        statusCode: 404,
        message: "Utente non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Utente aggiornato con successo",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE
users.delete("/delete/:id", async (request, response, next) => {
  try {
    const deletedUser = await usersSchema.findByIdAndDelete(request.params.id);

    if (!deletedUser) {
      return response.status(404).send({
        statusCode: 404,
        message: "Utente non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Utente eliminato con successo",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = users;
