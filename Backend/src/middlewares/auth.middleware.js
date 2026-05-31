const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {

  try {

    let token = null;

    // TOKEN FROM HEADER
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // TOKEN FROM COOKIE
    if (!token && req.cookies.token) {
      token = req.cookies.token;
    }

    // NO TOKEN
    if (!token) {
      return res.status(401).json({
        message: "Token not provided"
      });
    }

    // CHECK BLACKLIST
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
      token
    });

    if (isTokenBlacklisted) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (err) {

    console.log(err);

    return res.status(401).json({
      message: "Invalid token"
    });

  }
}

module.exports = { authUser };