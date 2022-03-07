const mongoose = require("mongoose");

const CarouselSchema = new mongoose.Schema(
  {
    path: { type: String, required: true },
    link: { type: String },
    slidenum: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Carousel = mongoose.model("Carousel", CarouselSchema);

module.exports = Carousel;
