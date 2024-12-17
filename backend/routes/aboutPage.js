const express = require("express");
const aboutPage = express.Router();
const aboutSchema = require("../models/aboutSchema");

const createDefaultAboutPage = async () => {
  const defaultAboutPage = {
    aboutTitle: "LOREM IPSUM DOLOR SIT AMET",
    aboutSubtitle: "LOREM IPSUM DOLOR SIT AMET",
    aboutDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas tellus magna, sed pharetra ipsum luctus a. Praesent lorem tortor,  fermentum vel condimentum a, eleifend a turpis. Pellentesque quis massa ipsum. Phasellus tempor rhoncus purus, ac efficitur lectus posuere in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ullamcorper elit, non mattis dolor egestas non. Suspendisse elementum dui diam, non iaculis quam molestie vitae. Maecenas non dui sem. Sed auctor dolor a mollis accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas tellus magna, sed pharetra ipsum luctus a. Praesent lorem tortor, fermentum vel condimentum a, eleifend a turpis. Pellentesque quis massa ipsum. Phasellus tempor rhoncus purus, ac efficitur lectus posuere in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ullamcorper elit, non mattis dolor egestas non. Suspendisse elementum dui diam, non iaculis quam molestie vitae. Maecenas non dui sem. Sed auctor dolor a mollis accumsan",
    aboutImage: "https://placehold.co/1920x700?text=Slider+1",
    contactTitle: "LOREM IPSUM DOLOR SIT AMET",
    contactSubtitle: "LOREM IPSUM DOLOR SIT AMET",
    contactDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas tellus magna, sed pharetra ipsum luctus a. Praesent lorem tortor, fermentum vel condimentum a, eleifend a turpis. Pellentesque quis massa ipsum. Phasellus tempor rhoncus purus, ac efficitur lectus posuere in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ullamcorper elit, non mattis dolor egestas non. Suspendisse elementum dui diam, non iaculis quam molestie vitae. Maecenas non dui sem. Sed auctor dolor a mollis accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas tellus magna, sed pharetra ipsum luctus a. Praesent lorem tortor, fermentum vel condimentum a, eleifend a turpis. Pellentesque quis massa ipsum. Phasellus tempor rhoncus purus, ac efficitur lectus posuere in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus ullamcorper elit, non mattis dolor egestas non. Suspendisse elementum dui diam, non iaculis quam molestie vitae. Maecenas non dui sem. Sed auctor dolor a mollis accumsan",
    contactImage: "https://placehold.co/1920x700?text=Slider+1",
  };

  const existingAboutPage = await aboutSchema.findOne();
  if (!existingAboutPage) {
    const aboutPage = new aboutSchema(defaultAboutPage);
    await aboutPage.save();
  }
};

aboutPage.use(async (request, response, next) => {
  await createDefaultAboutPage();
  next();
});

// GET
aboutPage.get("/", async (request, response, next) => {
  try {
    const aboutPage = await aboutSchema.findOne();
    response.status(200).send({
      statusCode: 200,
      message: "AboutPage caricata correttamente",
      aboutPage,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH
aboutPage.patch("/update", async (request, response, next) => {
  try {
    const aboutPage = await aboutSchema.findOneAndUpdate({}, request.body, {
      new: true,
      runValidators: true,
    });
    response.status(200).send({
      statusCode: 200,
      message: "AboutPage aggiornata correttamente",
      aboutPage,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = aboutPage;
