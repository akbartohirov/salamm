const mongoose = require("mongoose");

const CompaniesSchema = new mongoose.Schema(
  {
    companyLink: { type: String, required: true },
    companyName: { type: String, required: true },
    img: {
      filename: { type: String, required: true },
      path: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Companies = mongoose.model("Companies", CompaniesSchema);

module.exports = Companies;
