const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    ownerName: String,
    shopName: String,
    email: { type: String, unique: true },
    phone: String,
    address: String,
    documents: {
        shopLicense: String,
        panCard: String,
        aadhaar: String,
        gst: String
    },
    verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('Shop', ShopSchema);
