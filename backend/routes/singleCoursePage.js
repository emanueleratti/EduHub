const express = require("express");
const singleCoursePage = express.Router();
const singleCourseSchema = require("../models/singleCourseSchema");
const categoriesSchema = require("../models/categoriesSchema");

const defaultCourse = {
  slug: "template",
  category: null, // Verrà impostato dinamicamente
  heroImage: "https://placehold.co/1920x700?text=Nome+Corso",
  title: "(es. Corso)",
  titleExtended: "(es. Nome Corso)",
  description: "(es. Lorem ipsum dolor sit amet...)",
  highlightedText: "(es. Testo in evidenza del corso)",
  levels: [
    {
      title: "(es. Livello)",
      description: "(es. Lorem ipsum dolor sit amet...)",
      programListTitle: "(es. PROGRAMMA CORSO)",
      programFirstListItems: [
        "(es. Elemento 1)",
        "(es. Elemento 2)",
        "(es. Elemento 3)",
        "(es. Elemento 4)",
        "(es. Elemento 5)",
      ],
      programSecondListItems: [
        "(es. Elemento 1)",
        "(es. Elemento 2)",
        "(es. Elemento 3)",
        "(es. Elemento 4)",
        "(es. Elemento 5)",
      ],
      programThirdListItems: [
        "(es. Elemento 1)",
        "(es. Elemento 2)",
        "(es. Elemento 3)",
        "(es. Elemento 4)",
        "(es. Elemento 5)",
      ],
      GROUP: {
        price: 0,
        duration: "(es. N° ore)",
        description: "(es. Descrizione corso di gruppo)",
      },
      SINGLE: {
        price: 0,
        duration: "(es. N° ore)",
        description: "(es. Descrizione corso singolo)",
      },
      FRIENDS: {
        price: 0,
        duration: "(es. N° ore)",
        description: "(es. Descrizione corso porta un amico)",
      },
    },
  ],
  isTemplate: true,
};

const createDefaultCourse = async () => {
  try {
    const defaultCategory = await categoriesSchema.findOne({
      isTemplate: false,
      slug: "default",
    });

    const templateCourse = await singleCourseSchema.findOne({
      isTemplate: true,
    });

    const editableCourses = await singleCourseSchema.find({
      isTemplate: false,
    });

    if (!templateCourse) {
      const template = new singleCourseSchema({
        ...defaultCourse,
        category: defaultCategory._id,
        isTemplate: true,
      });
      await template.save();
    }

    if (editableCourses.length === 0) {
      const editableDefault = new singleCourseSchema({
        ...defaultCourse,
        category: defaultCategory._id,
        isTemplate: false,
        slug: "default",
      });
      await editableDefault.save();
    }
  } catch (error) {
    console.error("Errore nella creazione del corso default:", error);
  }
};

singleCoursePage.use(async (request, response, next) => {
  await createDefaultCourse();
  next();
});

// GET
singleCoursePage.get("/", async (request, response, next) => {
  try {
    const courses = await singleCourseSchema
      .find({ isTemplate: false })
      .populate("category");

    if (courses.length === 0) {
      return response.status(404).send({
        statusCode: 404,
        message: "Nessun corso trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Lista Corsi recuperata con successo",
      courses: courses,
    });
  } catch (error) {
    next(error);
  }
});

// GET BY COURSE
singleCoursePage.get("/:course", async (request, response, next) => {
  try {
    const course = await singleCourseSchema
      .findOne({ slug: request.params.course })
      .populate("category");

    if (!course) {
      return response.status(404).send({
        statusCode: 404,
        message: "Corso non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Corso recuperato con successo",
      course,
    });
  } catch (error) {
    next(error);
  }
});

// POST
singleCoursePage.post("/create", async (request, response, next) => {
  try {
    const newCourse = new singleCourseSchema({
      ...request.body,
      isTemplate: false,
    });
    const course = await newCourse.save();

    response.status(201).send({
      statusCode: 201,
      message: "Corso creato con successo",
      course,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH
singleCoursePage.patch("/update/:id", async (request, response, next) => {
  try {
    const updatedCourse = await singleCourseSchema.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return response.status(404).send({
        statusCode: 404,
        message: "Corso non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Corso aggiornato con successo",
      course: updatedCourse,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE
singleCoursePage.delete("/delete/:id", async (request, response, next) => {
  try {
    const deletedCourse = await singleCourseSchema.findByIdAndDelete(
      request.params.id
    );

    if (!deletedCourse) {
      return response.status(404).send({
        statusCode: 404,
        message: "Corso non trovato",
      });
    }

    response.status(200).send({
      statusCode: 200,
      message: "Corso eliminato con successo",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = singleCoursePage;
