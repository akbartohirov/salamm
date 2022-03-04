const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const Banner = require("../models/Banner");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/svg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: fileFilter,
});

router.get("/", async (req, res) => {
  try {
    const brands = await Banner.find({});

    res.status(200).send(brands);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).send({ message: "brand not found" });
    }

    res.status(200).send(banner);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.patch("/:id", upload.single("img"), async (req, res) => {
  const id = req.params.id;
  const { link } = req.body;
  const img = req.file;

  try {
    const banner = await Banner.findById(id);

    if (banner) {
      banner.link = link ? link : banner.link;
      banner.img = img
        ? { filename: img.filename, path: img.path }
        : banner.img;

      await banner.save();
      res.status(200).send(banner);
    } else {
      res.status(404).send({ message: e.message });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
