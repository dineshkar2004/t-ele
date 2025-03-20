const axios = require('axios');

const sendOtp = async (aadharNumber) => {
    try {
        const response = await axios.post(`https://api.example.com/aadhar/send-otp`, { aadharNumber });
        return response.data;
    } catch (error) {
        throw new Error('Failed to send OTP');
    }
};

module.exports = { sendOtp };
