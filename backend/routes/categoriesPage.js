const express = require("express");
const categoriesPage = express.Router();
const categoriesSchema = require("../models/categoriesSchema");
const categoriesValidator = require("../middlewares/validators/categoriesValidator");

// GET
categoriesPage.get("/", async (request, response, next) => {
  try {
    const categories = await categoriesSchema.find();

    if (categories.length === 0) {
      return response.status(404).send({
        statusCode: 404,
        message: "Nessuna categoria trovata",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Lista Categorie recuperata con successo",
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
});

// GET ID
categoriesPage.get("/:id", async (request, response, next) => {
  try {
    const category = await categoriesSchema.findById(request.params.id);

    if (!category) {
      return response.status(404).send({
        statusCode: 404,
        message: "Categoria non trovata",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Categoria recuperata con successo",
      category,
    });
  } catch (error) {
    next(error);
  }
});

// POST
categoriesPage.post(
  "/create",
  // categoriesValidator,
  async (request, response, next) => {
    try {
      const newCategory = new categoriesSchema(request.body);
      const category = await newCategory.save();

      response.status(201).send({
        statusCode: 201,
        message: "Categoria creata con successo",
        category,
      });
    } catch (error) {
      next(error);
    }
  }
);

// PATCH
categoriesPage.patch(
  "/update/:id",
  // categoriesValidator,
  async (request, response, next) => {
    try {
      const updatedPage = await categoriesSchema.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true, runValidators: true }
      );

      if (!updatedPage) {
        return response.status(404).send({
          statusCode: 404,
          message: "Pagina categories non trovata",
        });
      }

      response.status(200).send({
        statusCode: 200,
        message: "Pagina categories aggiornata con successo",
        categoryPage: updatedPage,
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE
categoriesPage.delete("/delete/:id", async (request, response, next) => {
  try {
    const deletedPage = await categoriesSchema.findByIdAndDelete(
      request.params.id
    );

    if (!deletedPage) {
      return response.status(404).send({
        statusCode: 404,
        message: "Pagina categories non trovata",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Pagina categories eliminata con successo",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = categoriesPage;
