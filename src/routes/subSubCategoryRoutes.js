const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const SubSubCategory = require("../models/SubSubCategory");

router.post("/", async (req, res) => {
  const { subSubCategoryName, subCategory, category } = req.body;

  try {
    const subSubCategory = new SubSubCategory({
      subSubCategoryName,
      subCategory,
      category,
    });

    await subSubCategory.save();

    res.status(201).send(subSubCategory);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const subSubCategory = await SubSubCategory.find({});

    res.status(200).send(subSubCategory);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const subSubCategory = await SubSubCategory.findById(id);

    if (!subSubCategory) {
      return res.status(404).send({ message: "subsubcategory not found" });
    }

    res.status(200).send(subSubCategory);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { subSubCategoryName, subCategory, category } = req.body;

  try {
    const subSubCategoryToUpdate = await SubSubCategory.findById(id);

    if (subSubCategoryToUpdate) {
      subSubCategoryToUpdate.subSubCategoryName = subSubCategoryName
        ? subSubCategoryName
        : subSubCategoryToUpdate.subSubCategoryName;
      subSubCategoryToUpdate.subCategory = subCategory
        ? subCategory
        : subSubCategoryToUpdate.subCategory;
      subSubCategoryToUpdate.category = category
        ? category
        : subSubCategoryToUpdate.category;

      await subSubCategoryToUpdate.save();
      res.status(200).send(subSubCategoryToUpdate);
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
    const subSubCategory = await SubSubCategory.findById(id);

    if (!subSubCategory) {
      return res.status(404).send({ message: "category not found" });
    }

    await subSubCategory.remove();
    res.status(200).send({ message: "Subsubcategory has been deleted" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
