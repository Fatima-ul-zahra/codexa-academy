const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const optionalAuth = async (
  req,
  res,
  next
) => {
  try {
    const token =
      req.cookies?.codexa_token;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const admin =
      await Admin.findById(
        decoded.id
      ).select("-password");

    if (admin?.isActive) {
      req.admin = admin;
    }

    next();
  } catch {
    next();
  }
};

module.exports = {
  optionalAuth,
};