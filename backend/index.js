const PORT = 4040;

require("dotenv").config();
const init = require("./db");
const cors = require("cors");
const errorHandler = require("./middlewares/errors/errorHandler");
const badRequestHandler = require("./middlewares/errors/badRequestHandler");

const express = require("express");
const server = express();

// Routes
const homePage = require("./routes/homePage");
const coursesPage = require("./routes/coursesPage");

// Middlewares
server.use(express.json());
server.use(cors());
server.use(badRequestHandler);
server.use(errorHandler);

// Routes
server.use("/homePage", homePage);
server.use("/coursesPage", coursesPage);
init();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
