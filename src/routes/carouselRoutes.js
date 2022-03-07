const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const Carousel = require("../models/Carousel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
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
    const carousels = await Carousel.find({});

    res.status(200).send(carousels);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const carousel = await Carousel.findById(id);

    if (!carousel) {
      return res.status(404).send({ message: "carousel not found" });
    }

    res.status(200).send(carousel);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.patch("/:id", upload.single("img"), async (req, res) => {
  const id = req.params.id;
  const { link, slidenum } = req.body;
  const path = req.file;

  try {
    const carousel = await Carousel.findById(id);

    if (carousel) {
      carousel.link = link ? link : carousel.link;
      carousel.path = path ? path : carousel.path;
      carousel.slidenum = slidenum ? slidenum : carousel.slidenum;

      await carousel.save();
      res.status(200).send(carousel);
    } else {
      res.status(404).send({ message: e.message });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.post("/", upload.single("img"), async (req, res) => {
  const { path } = req.file;
  const { link, slidenum } = req.body;

  try {
    const carousel = await Carousel.create({ link, slidenum, path });

    res.status(201).send(carousel);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const carousel = await Carousel.findById(id);

    if (!carousel) {
      return res.status(404).send({ message: "carousel not found" });
    }

    await carousel.remove();

    res.status(200).send("Удалено");
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
