const express = require("express");
const { auth, admin, userAndAdmin } = require("../middleware/auth");
const Order = require("../models/Order");

const router = express.Router();

//create order
router.post("/", auth, async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    const saveOrder = await newOrder.save();
    res.status(201).send(saveOrder);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//change cart
router.patch("/:id", auth, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(updateOrder);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    await Order.findByIdAndDelete(id);
    res.status(200).send("The order has been deleted");
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/exact/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id);

    if (!order) {
      res.status(404);
      return res.send({ error: "product not found" });
    }

    res.status(200).send(order);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:userId", auth, async (req, res) => {
  const id = req.params.userId;
  try {
    const orders = await Order.find({ userId: id });

    if (!orders) {
      res.status(404);
      return res.send({ error: "product not found" });
    }

    res.status(200).send(orders);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders) {
      res.status(404);
      return res.sned({ error: "Not found" });
    }

    res.status(200).send(orders);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
