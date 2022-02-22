const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const SubCategory = require("../models/SubCategory");

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
    file.mimetype === "image/svg+xml" ||
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
  const { subCategoryName, category } = req.body;

  const isExists = await SubCategory.findOne({ subCategoryName, category });

  if (isExists) {
    return res.status(403).send({ message: "Duplicate value" });
  }
  try {
    const subCategory = new SubCategory({
      img: { filename: file.filename, path: file.path },
      subCategoryName,
      category,
    });

    await subCategory.save();

    res.status(201).send(subCategory);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const subCategories = await SubCategory.find({});

    res.status(200).send(subCategories);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res.status(404).send({ message: "subcategory not found" });
    }

    res.status(200).send(subCategory);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.patch("/:id", upload.single("img"), async (req, res) => {
  const id = req.params.id;
  const { subCategoryName, category } = req.body;
  const img = req.file;

  try {
    const subCategoryToUpdate = await SubCategory.findById(id);

    if (subCategoryToUpdate) {
      subCategoryToUpdate.subCategoryName = subCategoryName
        ? subCategoryName
        : subCategoryToUpdate.subCategoryName;
      subCategoryToUpdate.category = category
        ? category
        : subCategoryToUpdate.category;
      subCategoryToUpdate.img = img
        ? {
            filename: img.filename,
            path: img.path,
          }
        : subCategoryToUpdate.img;

      await subCategoryToUpdate.save();
      res.status(200).send(subCategoryToUpdate);
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
    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res.status(404).send({ message: "category not found" });
    }

    await subCategory.remove();
    res.status(200).send({ message: "category has been deleted" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
