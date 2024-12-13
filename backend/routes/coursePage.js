const express = require("express");
const coursePage = express.Router();
const courseSchema = require("../models/courseSchema");
const courseValidator = require("../middlewares/validators/courseValidator");

// GET
coursePage.get("/", async (request, response, next) => {
  try {
    const courses = await courseSchema.find();

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

// GET SLUG
coursePage.get("/corsi/:slug", async (request, response, next) => {
  try {
    const course = await courseSchema.findOne({
      slug: request.params.slug,
    });

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
coursePage.post("/create", async (request, response, next) => {
  try {
    const newCourse = new courseSchema(request.body);
    const course = await newCourse.save();

    response.status(201).send({
      statusCode: 201,
      message: "Corso creata con successo",
      course,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH
coursePage.patch("/update/:id", async (request, response, next) => {
  try {
    const updatedCourse = await courseSchema.findByIdAndUpdate(
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
coursePage.delete("/delete/:id", async (request, response, next) => {
  try {
    const deletedCourse = await courseSchema.findByIdAndDelete(
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

module.exports = coursePage;
