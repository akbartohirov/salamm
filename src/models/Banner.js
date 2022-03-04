const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    img: {
      filename: { type: String, required: true },
      path: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", BannerSchema);

module.exports = Banner;
