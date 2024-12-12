const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  heroSlider: [
    {
      type: String,
      required: true,
    },
  ],
  firstIncipit: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  firstDescription: {
    type: String,
    required: true,
  },
  sloganSubtitle: {
    type: String,
    required: true,
  },
  sloganTitle: {
    type: String,
    required: true,
  },
  secondDescription: {
    type: String,
    required: true,
  },
  scrollText: {
    type: String,
    required: true,
  },
  ctaTitle: {
    type: String,
    required: true,
  },
  ctaDescription: {
    type: String,
    required: true,
  },
  ctaButton: {
    type: String,
    required: true,
  },
  ctaLink: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("homeSchema", homeSchema, "homepage");
