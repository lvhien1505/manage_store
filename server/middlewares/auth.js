const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const {
  ERROR_SERVER,
  INVALID_TOKEN,
  NOT_PERMISSON,
} = require("../utils/notify");

const checkAuth = async (req, res, next) => {
  try {
    let auth = req.headers.authorization;
    if (auth) {
      let token = auth.split(" ")[1];
      let decode = await jwt.verify(token, process.env.JWT_SECRET);
      if (!decode) {
        return res.status(500).json(INVALID_TOKEN);
      }
      let user = await UserModel.findById(decode.id);
      if (user) {
        user.password = undefined;
        req.user = user;
        next();
      }
    }
  } catch (error) {
    return res.status(500).json(ERROR_SERVER);
  }
};

let checkAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(400).json(NOT_PERMISSON);
  }
};

module.exports = {
  checkAuth,
  checkAdmin,
};
