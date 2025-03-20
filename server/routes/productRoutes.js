const express = require('express');
const multer = require('multer');
const { addProduct, getAllProducts } = require('../controllers/productController');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/add', upload.single('image'), addProduct);
router.get('/all', getAllProducts);

module.exports = router;
