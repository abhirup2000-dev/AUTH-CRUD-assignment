const jwt = require("jsonwebtoken");

const AuthCheck = async (req, res, next) => {
  let token =
    req.cookies?.token ||
    req.body?.token ||
    req.query?.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Token is required for access this page",
    });
  }

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Invalid token",
    });
  }
  return next();
};

module.exports = AuthCheck;
