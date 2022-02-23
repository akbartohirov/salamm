const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

//register
router.post(
  "/register",
  [
    check("name", "Username is required").exists(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must include 6 or over 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      const { email, password, name, phone } = req.body;

      const checkUser = await User.findOne({ email });

      if (checkUser) {
        return res.status(403).send({
          msg: "User already exists",
        });
      }

      const user = new User({
        email,
        name,
        password,
        phone,
      });

      const token = await user.generateToken();

      await user.save();
      res.status(201).send({
        user,
        token,
      });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }
);

//login
router.post(
  "/login",
  [
    check("email", "Provide valid email").isEmail(),
    check("password", "Password must include over 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findByCredentials(email, password);
      const token = await user.generateToken();

      console.log("user");

      res.status(200).send({
        user,
        token,
      });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }
);

module.exports = router;
