const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    subCategoryName: { type: String, required: true },
    img: {
      filename: { type: String, required: true },
      path: { type: String, required: true },
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

module.exports = SubCategory;
