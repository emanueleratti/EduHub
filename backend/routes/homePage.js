const express = require("express");
const homePage = express.Router();
const homePageSchema = require("../models/homePageSchema");
const homePageValidator = require("../middlewares/validators/homePageValidator");

const createDefaultHomePage = async () => {
  const defaultHomePage = {
    heroSlider: [
      "https://placehold.co/1920x700?text=Slider+1",
      "https://placehold.co/1920x700?text=Slider+2",
      "https://placehold.co/1920x700?text=Slider+3",
    ],
    firstIncipit:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas tellus magna, sed pharetra ipsum luctus a. Praesent lorem tortor, fermentum vel condimentum a, eleifend a turpis. Pellentesque quis massa ipsum. Phasellus tempor rhoncus purus, ac efficitur lectus posuere in.",
    logo: "https://placehold.co/200x125?text=Software+Logo",
    firstDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ullamcorper elit, non mattis dolor egestas non. Suspendisse elementum dui diam, non iaculis quam molestie vitae. Maecenas non dui sem. Sed auctor dolor a mollis accumsan. Praesent sed bibendum nibh. Vivamus fermentum nunc arcu, id condimentum dolor placerat non. Integer id ligula libero. Morbi auctor nunc ipsum, vitae tempus velit iaculis ac. Nam iaculis sapien ac justo ultrices, quis auctor ligula porttitor. Phasellus ullamcorper enim et dui fringilla, nec dapibus quam commodo. Integer tempus ultrices lacus, at congue enim congue sit amet. Praesent ex dolor, condimentum nec porta a, ultrices nec turpis. Proin viverra quam quis maximus consectetur. Pellentesque dui tortor, consequat non tempor eget, tincidunt sed mauris.",
    sloganSubtitle: "SLOGAN SECTION SUBTITLE",
    sloganTitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ullamcorper elit.",
    secondDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ullamcorper elit, non mattis dolor egestas non. Suspendisse elementum dui diam, non iaculis quam molestie vitae. Maecenas non dui sem. Sed auctor dolor a mollis accumsan. Praesent sed bibendum nibh. Vivamus fermentum nunc arcu, id condimentum dolor placerat non. Integer id ligula libero. Morbi auctor nunc ipsum, vitae tempus velit iaculis ac. Nam iaculis sapien ac justo ultrices, quis auctor ligula porttitor. Phasellus ullamcorper enim et dui fringilla, nec dapibus quam commodo. Integer tempus ultrices lacus, at congue enim congue sit amet. Praesent ex dolor, condimentum nec porta a, ultrices nec turpis. Proin viverra quam quis maximus consectetur. Pellentesque dui tortor, consequat non tempor eget, tincidunt sed mauris.",
    scrollText: "SCROLL TEXT SCROLL TEXT",
    ctaTitle: "Scopri i nostri corsi",
    ctaDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ullamcorper elit, non mattis dolor egestas non. Suspendisse elementum dui diam, non iaculis quam molestie vitae. ",
    ctaButton: "CLICCA QUI",
    ctaLink: "/corsi",
  };

  const existingHomePage = await homePageSchema.findOne();
  if (!existingHomePage) {
    const homePage = new homePageSchema(defaultHomePage);
    await homePage.save();
  }
};

homePage.use(async (request, response, next) => {
  await createDefaultHomePage();
  next();
});

// GET
homePage.get("/", async (request, response, next) => {
  try {
    const homePage = await homePageSchema.findOne();
    response.status(200).send({
      statusCode: 200,
      message: "HomePage caricata correttamente",
      homePage,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH
homePage.patch(
  "/update",
  // homePageValidator,
  async (request, response, next) => {
    try {
      const homePage = await homePageSchema.findOneAndUpdate({}, request.body, {
        new: true,
        runValidators: true,
      });
      response.status(200).send({
        statusCode: 200,
        message: "HomePage aggiornata correttamente",
        homePage,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = homePage;
