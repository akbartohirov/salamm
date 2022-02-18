const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true },
    img: {
      filename: { type: String, required: true },
      path: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
