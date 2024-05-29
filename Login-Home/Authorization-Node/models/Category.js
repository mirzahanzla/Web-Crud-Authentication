const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  product: String,
});

module.exports = mongoose.model("Category", categorySchema);
