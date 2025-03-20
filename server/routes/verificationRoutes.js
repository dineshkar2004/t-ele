const express = require("express");
const router = express.Router(); // ✅ Define router properly

router.post("/verify", async (req, res) => {
    const { gstNumber, panNumber, aadharNumber } = req.body;

    if (!gstNumber || !panNumber || !aadharNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Dummy verification logic (Replace with actual verification API)
        if (gstNumber.length !== 15 || panNumber.length !== 10 || aadharNumber.length !== 12) {
            return res.status(400).json({ message: "Invalid details" });
        }

        res.json({ message: "Verification successful" });
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router; // ✅ Export router correctly
