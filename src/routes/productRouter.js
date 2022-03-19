const express = require("express");
const { auth, admin } = require("../middleware/auth");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/svg"
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

router.post("/", auth, upload.array("img", 10), async (req, res) => {
  const uploads = req.files;

  const images = uploads
    ? uploads.map((item) => {
        return { filename: item.filename, path: item.path };
      })
    : null;

  const productForm = {
    title: req.body.title,
    description: req.body.description,
    img: images,
    category: req.body.category,
    subCategory: req.body.subCategory,
    subSubCategory: req.body.subSubCategory,
    color: req.body.color,
    boughtPrice: req.body.boughtPrice,
    sellPrice: req.body.sellPrice,
    amount: req.body.amount,
    brand: req.body.brand ? req.body.brand : "",
  };

  try {
    const newProduct = new Product(productForm);

    const product = await newProduct.save();

    res.status(201).send(product);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.put("/:id", upload.array("img", 10), async (req, res) => {
  const uploads = req.files;

  const id = req.params.id;
  const {
    title,
    category,
    description,
    color,
    sellPrice,
    boughtPrice,
    amount,
    img,
  } = req.body;

  const images = uploads
    ? uploads.map((item) => {
        return { filename: item.filename, path: item.path };
      })
    : null;
  const toUpdate = {
    title,
    category,
    description,
    color,
    sellPrice,
    boughtPrice,
    amount,
    img: images ? images : img,
  };
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, toUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).send(updateProduct);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    return res.send({ message: "Product not found" });
  }

  try {
    await product.remove();

    res.status(201).send("Product has been deleted");
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/sorted", async (req, res) => {
  try {
    let sortedProducts = await Product.find();

    sortedProducts = [...sortedProducts].sort((a, b) => b.seen - a.seen);

    res.status(200).send(sortedProducts);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    let products;

    if (qNew && qCategory) {
      products = await Product.find({ category: qCategory })
        .sort({ createdAt: 1 })
        .limit(1);
    } else if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(10);
    } else if (qCategory) {
      products = await Product.find({ category: qCategory });
    } else {
      products = await Product.find();
    }

    res.status(200).send(products);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findById(id);
    product.seen++;
    console.log(product);

    await product.save();

    res.status(200).send(product);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.post("/cart", async (req, res) => {
  const ids = req.body.products;

  const formatted = ids.map((id) => mongoose.Types.ObjectId(id));

  try {
    const products = await Product.find({
      _id: { $in: formatted },
    });
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).send({ error: "not found" });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.post("/search", async (req, res) => {
  const { q } = req.query;

  try {
    const products = await Product.find();

    const search = products.filter((product) => {
      const filtered = product.title.toLowerCase().includes(q);
      return filtered;
    });

    if (search.length > 0) {
      res.status(200).send(search);
    } else {
      res.status(404).send({
        error: "not found",
      });
    }
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});

module.exports = router;
