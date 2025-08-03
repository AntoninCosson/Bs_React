const express = require("express");
const router = express.Router();
const Product = require("../models/products");


router.get('/', (req, res) => {
    Product.find()
    .then(data => {
        if (data) {
            res.json({ 
            result: true,
            products: data,
            
        });
        } else {
            res.json({ result: false, error: 'No products found' });
        }
    })
        .catch(error => {
            res.status(500).json({ result: false, error: error.message });
    });
});




module.exports = router;