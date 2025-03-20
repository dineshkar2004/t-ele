const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const shopkeeperRoutes = require('./routes/shopkeeperRoutes');

require('dotenv').config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRoutes);
app.use('/shopkeeper', shopkeeperRoutes);

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const verificationRoutes = require("./routes/verificationRoutes");
app.use("/", verificationRoutes);

