const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const Companies = require("../models/Companies");

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
    file.mimetype === "image/svg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/png"
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
  const companyLink = req.body.companyLink;
  const companyName = req.body.companyName;

  const isExists = await Companies.findOne({ companyName });

  if (isExists) {
    return res.status(403).send({ message: "Duplicate value" });
  }

  try {
    const company = new Companies({
      img: { filename: file.filename, path: file.path },
      companyLink,
      companyName,
    });

    await company.save();

    res.status(201).send(company);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const companies = await Companies.find({});

    res.status(200).send(companies);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const company = await Companies.findById(id);

    if (!company) {
      return res.status(404).send({ message: "company not found" });
    }

    res.status(200).send(company);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.patch("/:id", upload.single("img"), async (req, res) => {
  const id = req.params.id;
  const { companyLink } = req.body;
  const { companyName } = req.body;
  const img = req.file;

  try {
    const companyToUpdate = await Companies.findById(id);

    if (companyToUpdate) {
      companyToUpdate.companyLink = companyLink
        ? companyLink
        : companyToUpdate.companyLink;
      companyToUpdate.companyName = companyName
        ? companyName
        : companyToUpdate.companyName;
      companyToUpdate.img = img
        ? { filename: img.filename, path: img.path }
        : companyToUpdate.img;

      await companyToUpdate.save();
      res.status(200).send(companyToUpdate);
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
    const company = await Companies.findById(id);

    if (!company) {
      return res.status(404).send({ message: "company not found" });
    }

    await company.remove();
    res.status(200).send({ message: "company has been deleted" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
