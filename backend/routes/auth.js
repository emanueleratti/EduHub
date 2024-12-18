const express = require("express");
const auth = express.Router();
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middlewares/utils/authToken");
const User = require("../models/usersSchema");

auth.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(401).json({ message: "Credenziali non valide" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response.status(401).json({ message: "Credenziali non valide" });
    }

    const token = generateToken(user);

    response.json({
      message: "Login effettuato con successo",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore durante il login", error: error.message });
  }
});

auth.post("/register", async (request, response) => {
  try {
    const { email, password } = request.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: "Email già registrata" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      role: "admin", // Per ora tutti admin come richiesto
    });

    await user.save();

    const token = generateToken(user);

    response.status(201).json({
      message: "Utente registrato con successo",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    response.status(500).json({
      message: "Errore durante la registrazione",
      error: error.message,
    });
  }
});

module.exports = auth;
