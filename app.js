const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./src/routes/authRouter");
const userRouter = require("./src/routes/userRouter");
const productRouter = require("./src/routes/productRouter");
const orderRouter = require("./src/routes/orderRouter");
dotenv.config({ path: ".env" });
const cors = require("cors");
const categoryRoutes = require("./src/routes/categoryRoutes");
const subCategoryRoutes = require("./src/routes/subCategoryRoutes");
const subSubCategoryRoutes = require("./src/routes/subSubCategoryRoutes");
const brandRoutes = require("./src/routes/brandRoutes");
const companyRoutes = require("./src/routes/companyRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const bannerRoutes = require("./src/routes/bannerRoutes");
const carouselRoutes = require("./src/routes/carouselRoutes");

mongoose
  .connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongodb has been connected"));

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/category", categoryRoutes);
app.use("/subcategory", subCategoryRoutes);
app.use("/subsubcategory", subSubCategoryRoutes);
app.use("/brand", brandRoutes);
app.use("/companies", companyRoutes);
app.use("/payment", paymentRoutes);
app.use("/banner", bannerRoutes);
app.use("/carousel", carouselRoutes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App has been started on port ${PORT}...`);
});
