const mongoose = require("mongoose");

const coursesPageSchema = new mongoose.Schema({
  heroImage: {
    type: String,
    required: true,
  },
  sloganTitle: {
    type: String,
    required: true,
  },
  iconFirstNumber: {
    type: String,
    required: true,
  },
  iconFirstTitle: {
    type: String,
    required: true,
  },
  iconSecondNumber: {
    type: String,
    required: true,
  },
  iconSecondTitle: {
    type: String,
    required: true,
  },
  iconThirdNumber: {
    type: String,
    required: true,
  },
  iconThirdTitle: {
    type: String,
    required: true,
  },
  firstSubtitle: {
    type: String,
    required: true,
  },
  firstDescription: {
    type: String,
    required: true,
  },
  gallerySlider: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "coursesPageSchema",
  coursesPageSchema,
  "coursespage"
);
