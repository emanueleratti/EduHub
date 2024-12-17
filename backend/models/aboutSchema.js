const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  aboutTitle: {
    type: String,
    required: true,
  },
  aboutSubtitle: {
    type: String,
    required: true,
  },
  aboutDescription: {
    type: String,
    required: true,
  },
  aboutImage: {
    type: String,
    required: true,
  },
  contactTitle: {
    type: String,
    required: true,
  },
  contactSubtitle: {
    type: String,
    required: true,
  },
  contactDescription: {
    type: String,
    required: true,
  },
  contactImage: {
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

module.exports = mongoose.model("aboutSchema", aboutSchema, "about");
