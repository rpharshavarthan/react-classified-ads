const Category = require('../models/category.model');

const categoryCtrl = {
    getCategory: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    createCategory: async (req, res) => {
        try {
          const { name } = req.body;
          const category = await Category.findOne({ name });
          if (category) {
            return res
              .status(200)
              .json({ message: "category not created, already exists" });
          }
          const newCategory = new Category({ name });
          const savedCategory = await newCategory.save();
          res
            .status(201)
            .json({ category: savedCategory, message: "category added" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteCategory: async (req, res) => {
        try{
            const delCategory = await Category.findByIdAndDelete(req.params.id);
            res.json({message: "deleted category"})
        }
        catch(error){
            return res.status(500).json({ message: error.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const {name} = req.body;
            await Category.findByIdAndUpdate({_id: req.params.id}, {name});
            res.json({ message: "category updated" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = categoryCtrl;