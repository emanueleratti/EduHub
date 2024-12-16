const express = require("express");
const categoriesPage = express.Router();
const categoriesSchema = require("../models/categoriesSchema");

const defaultCategory = {
  slug: "template",
  title: "(es. Categoria)",
  titleExtended: "(es. Categoria Titolo)",
  subtitle: "(es. SOTTOTITOLO)",
  description:
    "(es. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ullamcorper elit, non mattis dolor egestas non. Suspendisse elementum dui diam, non iaculis quam molestie vitae. Maecenas non dui sem. Sed auctor dolor a mollis accumsan. Praesent sed bibendum nibh. Vivamus fermentum nunc arcu, id condimentum dolor placerat non. Integer id ligula libero. Morbi auctor nunc ipsum, vitae tempus velit iaculis ac. Nam iaculis sapien ac justo ultrices, quis auctor ligula porttitor.)",
  gallerySlider: [
    "https://placehold.co/1920x700?text=Categoria+1",
    "https://placehold.co/1920x700?text=Categoria+2",
    "https://placehold.co/1920x700?text=Categoria+3",
  ],
  isTemplate: true,
};

const createDefaultCategory = async () => {
  try {
    const templateCategory = await categoriesSchema.findOne({
      isTemplate: true,
    });

    const editableCategories = await categoriesSchema.find({
      isTemplate: false,
    });

    if (!templateCategory) {
      const template = new categoriesSchema({
        ...defaultCategory,
        isTemplate: true,
      });
      await template.save();
    }

    if (editableCategories.length === 0) {
      const editableDefault = new categoriesSchema({
        ...defaultCategory,
        isTemplate: false,
        slug: "default",
      });
      await editableDefault.save();
    }
  } catch (error) {
    next(error);
  }
};

categoriesPage.use(async (request, response, next) => {
  await createDefaultCategory();
  next();
});

// GET
categoriesPage.get("/", async (request, response, next) => {
  try {
    const categories = await categoriesSchema.find({ isTemplate: false });

    if (categories.length === 0) {
      return response.status(404).send({
        statusCode: 404,
        message: "Nessuna categoria trovata",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Categorie recuperate con successo",
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
});

// GET CATEGORY
categoriesPage.get("/:category", async (request, response, next) => {
  try {
    const category = await categoriesSchema.findOne({
      slug: request.params.category,
    });

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
categoriesPage.post("/create", async (request, response, next) => {
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
});

// PATCH
categoriesPage.patch("/update/:id", async (request, response, next) => {
  try {
    const updatedCategory = await categoriesSchema.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return response.status(404).send({
        statusCode: 404,
        message: "Categoria non trovata",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Categoria aggiornata con successo",
      category: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE
categoriesPage.delete("/delete/:id", async (request, response, next) => {
  try {
    const deletedCategory = await categoriesSchema.findByIdAndDelete(
      request.params.id
    );

    if (!deletedCategory) {
      return response.status(404).send({
        statusCode: 404,
        message: "Categoria non trovata",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Categoria eliminata con successo",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = categoriesPage;
