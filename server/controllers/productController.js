const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    try {
        const { shopName, productName, price, discount, description } = req.body;
        const image = req.file ? req.file.path : '';
        const product = await Product.create({ shopName, productName, price, discount, image, description });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};
