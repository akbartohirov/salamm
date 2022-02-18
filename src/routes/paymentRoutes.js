const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/payme", (req, res) => {
  res.send("hello");
});

module.exports = router;
