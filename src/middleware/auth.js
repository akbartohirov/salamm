const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config({ path: ".env" });

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error("Please authenticate!");
    }

    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

const userAndAdmin = (req, res, next) => {
  if (req.params.id === req.user._id || req.user.isAdmin) {
    next();
  } else {
    res.status(403).send({ msg: "Please authenticate" });
  }
};

const admin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).send({ msg: "You are not allowed to do that operation!" });
  }
};

module.exports = { auth, admin, userAndAdmin };
