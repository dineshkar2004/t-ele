const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    shopName: String,
    productName: String,
    price: Number,
    discount: Number,
    image: String,
    description: String
});

module.exports = mongoose.model('Product', ProductSchema);
