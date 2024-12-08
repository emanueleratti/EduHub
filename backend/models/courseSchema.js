const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoriesSchema",
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
  levels: {
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
    programListItems: [
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("courseSchema", courseSchema);
