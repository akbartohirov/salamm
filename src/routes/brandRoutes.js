const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const Brand = require("../models/Brands");

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
  const brandName = req.body.brandName;

  const isExists = await Brand.findOne({ brandName });

  if (isExists) {
    return res.status(403).send({ message: "Duplicate value" });
  }

  try {
    const brand = new Brand({
      img: { filename: file.filename, path: file.path },
      brandName,
    });

    await brand.save();

    res.status(201).send(brand);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find({});

    res.status(200).send(brands);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).send({ message: "brand not found" });
    }

    res.status(200).send(brand);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.patch("/:id", upload.single("img"), async (req, res) => {
  const id = req.params.id;
  const { brandName } = req.body;
  const img = req.file;

  try {
    const brandToUpdate = await Brand.findById(id);

    if (brandToUpdate) {
      brandToUpdate.brandName = brandName ? brandName : brandToUpdate.brandName;
      brandToUpdate.img = img
        ? { filename: img.filename, path: img.path }
        : brandToUpdate.img;

      await brandToUpdate.save();
      res.status(200).send(brandToUpdate);
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
    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).send({ message: "brand not found" });
    }

    await brand.remove();
    res.status(200).send({ message: "brand has been deleted" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
