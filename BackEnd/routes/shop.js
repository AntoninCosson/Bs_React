const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const Cart = require("../models/cart");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");


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

router.post('/cart/:userID', async (req, res) => {
    try{

    if (!checkBody(req.body, ["username", "password"])) {
        res.json({ result: false, error: "Missing or empty fields" });
        return;
        }
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ result: false, error: 'User not found' });
    
        let cart = await Cart.findOne({ user: userId })
          .populate({ 
            path: 'items.product',
            model: 'Product',
            select: 'name price img size promotion', // ce que tu veux renvoyer
          });
    
        // Créer un panier vide si inexistant
        if (!cart) {
          cart = await Cart.create({ user: userId, items: [] });
        }
    
        res.json({ result: true, cart });
      } catch (error) {
        res.status(500).json({ result: false, error: error.message });
      }
});





module.exports = router;