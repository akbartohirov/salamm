const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const Category = require("../models/Category");

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
    file.mimetype === "image/svg"
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

router.post("/", upload.single("img"), async (req, res) => {
  const file = req.file;
  const categoryName = req.body.categoryName;

  const isExists = await Category.findOne({ categoryName });

  if (isExists) {
    return res.status(403).send({ message: "Duplicate categoryname" });
  }

  try {
    const category = new Category({
      img: { filename: file.filename, path: file.path },
      categoryName,
    });

    await category.save();

    res.status(201).send(category);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});

    res.status(200).send(categories);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).send({ message: "category not found" });
    }

    res.status(200).send(category);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.patch("/:id", upload.single("img"), async (req, res) => {
  const id = req.params.id;
  const { categoryName } = req.body;
  const img = req.file;

  try {
    const categoryToUpdate = await Category.findById(id);

    if (categoryToUpdate) {
      categoryToUpdate.categoryName = categoryName
        ? categoryName
        : categoryToUpdate.categoryName;
      categoryToUpdate.img = img
        ? { filename: img.filename, path: img.path }
        : categoryToUpdate.img;

      await categoryToUpdate.save();
      res.status(200).send(categoryToUpdate);
    } else {
      res.status(404).send({ message: e.message });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).send({ message: "category not found" });
    }

    await category.remove();
    res.status(200).send({ message: "category has been deleted" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
