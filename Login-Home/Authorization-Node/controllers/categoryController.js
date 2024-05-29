const Category = require('../models/Category');

const loadData = async (req, res) => {
    await Category.insertMany(initialData);
    res.send('Initial data loaded');
};

const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.render('home', { categories });
};

const addCategory = async (req, res) => {
    const { title, description, price, product } = req.body;
    const newCategory = new Category({ title, description, price, product });

    await newCategory.save();
    res.redirect('/home');
};

const updateCategory = async (req, res) => {
    const { title, description, price, product } = req.body;
    await Category.findByIdAndUpdate(req.params.id, { title, description, price, product });
    res.redirect('/home');
};

const deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/home');
};

module.exports = {
    loadData,
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
};
