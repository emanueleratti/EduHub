const express = require("express");
const coursesPage = express.Router();
const coursesPageSchema = require("../models/coursesPageSchema");
const coursesPageValidator = require("../middlewares/validators/coursesPageValidator");

const createDefaultCoursesPage = async () => {
  const defaultCoursesPage = {
    heroImage: "https://placehold.co/1920x700?text=Slider+1",
    sloganTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    iconFirstNumber: "2",
    iconFirstTitle: "tipologie corsi",
    iconSecondNumber: "10+",
    iconSecondTitle: "corsi attivi",
    iconThirdNumber: "200+",
    iconThirdTitle: "corsi svolti",
    firstSubtitle: "LOREM IPSUM DOLOR SIT AMET",
    firstDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas tellus magna, sed pharetra ipsum luctus a. Praesent lorem tortor, fermentum vel condimentum a, eleifend a turpis. Pellentesque quis massa ipsum. Phasellus tempor rhoncus purus, ac efficitur lectus posuere in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ullamcorper elit, non mattis dolor egestas non. Suspendisse elementum dui diam, non iaculis quam molestie vitae. Maecenas non dui sem. Sed auctor dolor a mollis accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas tellus magna, sed pharetra ipsum luctus a. Praesent lorem tortor, fermentum vel condimentum a, eleifend a turpis. Pellentesque quis massa ipsum. Phasellus tempor rhoncus purus, ac efficitur lectus posuere in. Lorem ipsum dolor sit amet, consectetur adipiscing elissat. Praesent dapibus ullamcorper elit, non mattis dolor egestas non. Suspendisse elementum dui diam, non iaculis quam molestie vitae. Maecenas non dui sem. Sed auctor dolor a mollis accumsan",
    gallerySlider: [
      "https://placehold.co/1920x700?text=Slider+1",
      "https://placehold.co/1920x700?text=Slider+2",
      "https://placehold.co/1920x700?text=Slider+3",
    ],
  };

  const existingCoursesPage = await coursesPageSchema.findOne();
  if (!existingCoursesPage) {
    const coursesPage = new coursesPageSchema(defaultCoursesPage);
    await coursesPage.save();
  }
};

coursesPage.use(async (request, response, next) => {
  await createDefaultCoursesPage();
  next();
});

// GET
coursesPage.get("/", async (request, response, next) => {
  try {
    const coursesPage = await coursesPageSchema.findOne();
    response.status(200).send({
      statusCode: 200,
      message: "CoursesPage caricata correttamente",
      coursesPage,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH
coursesPage.patch(
  "/update",
  // coursesPageValidator,
  async (request, response, next) => {
    try {
      const coursesPage = await coursesPageSchema.findOneAndUpdate(
        {},
        request.body,
        {
          new: true,
          runValidators: true,
        }
      );
      response.status(200).send({
        statusCode: 200,
        message: "CoursesPage aggiornata correttamente",
        coursesPage,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = coursesPage;
