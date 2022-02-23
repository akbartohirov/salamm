const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { auth, admin } = require("../middleware/auth");

//get all users
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    if (!users) {
      return res.status(404).send({ msg: "Not found" });
    }
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//get stats
router.get("/stats", auth, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).send({ data });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//get my profile
router.get("/me", auth, async (req, res) => {
  res.status(200).send(req.user);
});

//get user by id
router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    res.status(200).send({ user });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//change user credentials
router.patch("/me", auth, async (req, res) => {
  try {
    const id = req.user._id;
    const credentials = req.body;

    if (credentials.password) {
      credentials.password = await bcrypt.hash(credentials.password, 8);
    }

    const user = await User.findByIdAndUpdate(id, credentials, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send({
        error: "Not found",
      });
    }

    res.status(200).send({ user });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//change user credentials as an admin
router.patch("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    const user = req.body;

    if (user.password) {
      user.password = await bcrypt.hash(user.password, 8);
    }

    const savedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({ savedUser });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//delete user
router.delete("/me", auth, async (req, res) => {
  try {
    const id = req.user._id;

    await User.findByIdAndDelete(id);
    res.status(200).send({ msg: "User has been deleted" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//delete user as an admin
router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    await User.findByIdAndDelete(id);
    res.status(200).send({ msg: "User has been deleted" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
