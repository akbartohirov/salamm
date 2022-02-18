const mongoose = require("mongoose");

const SubSubCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: String,
      ref: "SubCategory",
      required: true,
    },
    subSubCategoryName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SubSubCategory = mongoose.model("SubSubCategory", SubSubCategorySchema);

module.exports = SubSubCategory;
