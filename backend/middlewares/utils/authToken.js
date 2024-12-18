const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const verifyToken = (request, response, next) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({ message: "Token non fornito" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    return response.status(401).json({ message: "Token non valido" });
  }
};

module.exports = { generateToken, verifyToken };
