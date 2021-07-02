const Products = require("../models/product.model");

//
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((x) => delete queryObj[x]);
    let queryStr = JSON.stringify(queryObj);
    // prepending gte, gt, lt, lte, regex with $ so that we can use
    // mongodb comparision query to filter items
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(queryStr)); // find() --> mongodb method, not js
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  pagination() {
    // returns a set of documents belonging to page number `page_num`
    // where size of each page is `page_size` (no. of item in a page or limit)
    // to Calculate number of documents to skip
    // skips = page_size * (page_num - 1)
    const page_num = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 6;
    const skip = limit * (page_num - 1);
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

//
const productCtrl = {
  getProduct: async (req, res) => {
    try {
      const features = new APIFeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .pagination();
      const products = await features.query;
      res.json({
        status: "success",
        length: products.length,
        products,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getMyProduct: async (req, res) => {
    try {
      const features = new APIFeatures(Products.find({seller_id: req.params.id}), req.query)
        .filtering()
        .sorting()
        .pagination();
      const products = await features.query;
      res.json({
        status: "success",
        length: products.length,
        products,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        seller_id,
        product_id,
        title,
        price,
        description,
        image,
        category,
        condition,
        seller_name,
        study_year,
        course,
        phone,
        location,
      } = req.body;
      if (!image) {
        return res.status(400).json({ message: "no image uploaded" });
      }
      if(
        !seller_id ||
        !product_id ||
        !title ||
        !price ||
        !description ||
        !category ||
        !condition
      ){
        return res.status(400).json({ message: "please fill all the fields" });
      }
      const product = await Products.findOne({ product_id });
      if (product) {
        return res.status(400).json({ message: "product with this id already exists" });
      }
      const newProduct = new Products({
        seller_id,
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        image,
        category,
        condition,
        seller_name,
        study_year,
        course,
        phone,
        location,
      });
      await newProduct
        .save()
        .then(() => {
          console.log("product created");
        })
        .catch((e) => {
          console.log(e);
        });
      res.status(201).json({ message: "product created" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ message: "product deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        title,
        price,
        description,
        image,
        category,
        condition,
      } = req.body;
      if (!image) {
        return res.status(400).json({ message: "no image uploaded" });
      }
      await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          image,
          category,
          condition,
        }
      );
      res.status(201).json({ message: "updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productCtrl;
