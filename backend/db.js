const mongoose = require("mongoose");
require("dotenv").config();

const init = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log(error);
  }
};

module.exports = init;
