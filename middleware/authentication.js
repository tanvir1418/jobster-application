const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user to the job routes
    // const user = User.findById(payload.id).select('-password');  // alternative code, other procedure
    // req.user = user;                                             // alternative code, other procedure

    const testUser = payload.userId === "64e61483c7a6052d20383c3b"; // return type true/false

    req.user = { userId: payload.userId, name: payload.name, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
