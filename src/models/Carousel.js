const mongoose = require("mongoose");

const CarouselSchema = new mongoose.Schema(
  {
    img: [
      {
        filename: { type: String, required: true },
        path: { type: String, required: true },
        link: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Carousel = mongoose.model("Carousel", CarouselSchema);

module.exports = Carousel;
