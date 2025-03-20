const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Shopkeeper = require('../models/Shopkeeper');
const { sendOtp } = require('../config/otpService');

require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const { name, email, password, gstNumber, panNumber, aadharNumber, shopLicense } = req.body;

        // Check if the shopkeeper already exists
        const existingShopkeeper = await Shopkeeper.findOne({ email });
        if (existingShopkeeper) return res.status(400).json({ message: 'Shopkeeper already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create shopkeeper
        const shopkeeper = new Shopkeeper({
            name,
            email,
            password: hashedPassword,
            gstNumber,
            panNumber,
            aadharNumber,
            shopLicense,
            isVerified: false
        });

        await shopkeeper.save();

        // Send OTP for Aadhaar verification
        await sendOtp(aadharNumber);

        res.status(201).json({ message: 'Shopkeeper registered successfully. OTP sent for verification.' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find shopkeeper
        const shopkeeper = await Shopkeeper.findOne({ email });
        if (!shopkeeper) return res.status(400).json({ message: 'Invalid credentials' });

        // Check password
        const isMatch = await bcrypt.compare(password, shopkeeper.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT Token
        const token = jwt.sign({ shopkeeperId: shopkeeper._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};
