const PORT = 4040;

require("dotenv").config();
const init = require("./db");
const cors = require("cors");
const errorHandler = require("./middlewares/errors/errorHandler");
const badRequestHandler = require("./middlewares/errors/badRequestHandler");
const authPage = require("./routes/auth");
const { verifyToken } = require("./middlewares/utils/authToken");

const express = require("express");
const server = express();

// Routes
const homePage = require("./routes/homePage");
const coursesPage = require("./routes/coursesPage");
const categoriesPage = require("./routes/categoriesPage");
const singleCoursePage = require("./routes/singleCoursePage");
const aboutPage = require("./routes/aboutPage");
const users = require("./routes/users");
const contact = require("./routes/contact");
const upload = require("./routes/upload");

// Middlewares
server.use(express.json());
server.use(cors());

// Routes Public
server.use("/auth", authPage);

// Routes Protected
server.use("/homePage", homePage);
server.use("/coursesPage", coursesPage);
server.use("/categoriesPage", categoriesPage);
server.use("/singleCoursePage", singleCoursePage);
server.use("/aboutPage", aboutPage);
server.use("/users", users);
server.use("/contact", contact);
server.use("/upload", upload);
init();

server.use(badRequestHandler);
server.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
