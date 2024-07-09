const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

router.get('/products', async (req, res) => {
    try {
        const minPrice = 500; 
        const products = await Product.find({ price: { $gte: minPrice } });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
