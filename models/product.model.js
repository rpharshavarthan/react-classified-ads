const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    seller_id: {
      type: String,
      required: true,
      trim: true,
    },
    product_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    condition: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
      trim: true,
    },
    seller_name: {
      type: String,
      required: true,
      trim: true,
    },
    study_year: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    checked: {
      type: Boolean,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
