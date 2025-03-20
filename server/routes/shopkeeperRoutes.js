const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Shopkeeper = require("../models/Shopkeeper");

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp
    }
});

const upload = multer({ storage });

// ✅ Shopkeeper Registration Route
router.post("/register", upload.single("shopLicense"), async (req, res) => {
    console.log("🔹 Received request at /shopkeeper/register:", req.body);

    try {
        const { name, email, password, gstNumber, panNumber, aadharNumber, shopName } = req.body;

        if (!name || !email || !password || !gstNumber || !panNumber || !aadharNumber || !shopName || !req.file) {
            return res.status(400).json({ message: "All fields, including shop license, are required" });
        }

        const shopLicensePath = req.file.path; // ✅ Save file path

        const newShopkeeper = new Shopkeeper({ name, email, password, gstNumber, panNumber, aadharNumber, shopName, shopLicense: shopLicensePath });

        await newShopkeeper.save();

        console.log("✅ Shopkeeper registered successfully:", email);
        res.status(201).json({ message: "Shopkeeper registered successfully" });

    } catch (error) {
        console.error("❌ Shopkeeper registration error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;
