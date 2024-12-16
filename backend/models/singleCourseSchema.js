const mongoose = require("mongoose");

const singleCourseSchema = new mongoose.Schema({
  isTemplate: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoriesSchema",
    required: true,
  },
  heroImage: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  titleExtended: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  highlightedText: {
    type: String,
    required: true,
  },
  levels: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      programListTitle: {
        type: String,
        required: true,
      },
      programFirstListItems: [
        {
          type: String,
          required: true,
        },
      ],
      programSecondListItems: [
        {
          type: String,
          required: true,
        },
      ],
      programThirdListItems: [
        {
          type: String,
          required: true,
        },
      ],
      GROUP: {
        price: {
          type: Number,
          required: true,
        },
        duration: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
      SINGLE: {
        price: {
          type: Number,
          required: true,
        },
        duration: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
      FRIENDS: {
        price: {
          type: Number,
          required: true,
        },
        duration: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
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
  "singleCourseSchema",
  singleCourseSchema,
  "course"
);
