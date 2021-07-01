const Products = require("../models/product.model");

const myAdCtrl = {
  getMyAd: async (req, res) => {
    try {
      const ad = await Products.find({ seller_id: req.user.id });
      res.status(200).json({
        status: "success",
        length: ad.length,
        ad,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = myAdCtrl