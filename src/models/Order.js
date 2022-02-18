const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [],
    stir: { type: String },
    entityName: { type: String },
    phone: { type: String },
    city: { type: String, required: true },
    street: { type: String, required: true },
    typeSending: { type: String },
    status: { type: String, default: "новый" },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", CartSchema);

module.exports = Order;
