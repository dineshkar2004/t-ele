const mongoose = require('mongoose');

const ShopkeeperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    gstNumber: { type: String, required: true, unique: true },
    panNumber: { type: String, required: true, unique: true },
    aadharNumber: { type: String, required: true, unique: true },
    shopLicense: { type: String, required: true }, // License file path
    isVerified: { type: Boolean, default: false }, // Status after verification
});

module.exports = mongoose.model('Shopkeeper', ShopkeeperSchema);
