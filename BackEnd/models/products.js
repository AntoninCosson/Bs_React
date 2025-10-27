const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema(
  {
  name: String,
  img: String,
  description: String,
  size: String,
  price: Number,
  category: String,
  quantity: Number,
  dateOnline: { type: Date, default: Date.now },
  promotion: Boolean,
  
});

const Product = mongoose.model("product", ProductsSchema);

module.exports = Product;