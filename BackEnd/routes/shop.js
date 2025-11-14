// BackEnd/routes/shop.js
const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const User = require("../models/users");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");

// Produits Hors Co & Co
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products)
      return res.json({ result: false, error: "No products found" });
    res.json({ result: true, products });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

router.use(auth);

router.post("/cart/preview", async (req, res) => {
  // console.log(">>> REQ.USER:", req.user);
  // console.log(">>> AUTH HEADER:", req.headers.authorization);
  try {
    const userId = req.user.id;
    const incoming = Array.isArray(req.body.items) ? req.body.items : [];
    const user = await User.findById(userId).populate({
      path: "cart.productId",
      model: "product",
    });
    if (!user)
      return res.status(404).json({ result: false, error: "User not found" });

    const serverMap = new Map(
      (user.cart || []).map((i) => [String(i.productId._id || i.productId), i])
    );
    const onlyLocal = [];
    const onlyServer = [];
    const both = [];

    for (const it of incoming) {
      if (!it?.productId || !Number.isFinite(it?.quantity)) continue;
      const key = String(it.productId);
      const serv = serverMap.get(key);
      if (serv) {
        both.push({
          productId: key,
          localQty: it.quantity | 0,
          serverQty: serv.quantity | 0,
          product: serv.productId,
        });
        serverMap.delete(key);
      } else {
        const product = await Product.findById(key).lean();
        onlyLocal.push({ productId: key, localQty: it.quantity | 0, product });
      }
    }
    for (const [key, serv] of serverMap) {
      onlyServer.push({
        productId: key,
        serverQty: serv.quantity | 0,
        product: serv.productId,
      });
    }

    // add validations: prix/stock/promos
    // champ warnings: [] si nécessaire

    res.json({ result: true, onlyLocal, onlyServer, both });
  } catch (e) {
    res.status(500).json({ result: false, error: e.message });
  }
});

router.post("/cart/apply", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ result: false, error: "User not found" });

    const items = Array.isArray(req.body.items) ? req.body.items : [];
    user.cart = items
      .filter((it) => it?.productId && Number.isFinite(it?.quantity))
      .map((it) => ({
        productId: it.productId,
        quantity: Math.max(1, it.quantity | 0),
      }));

    await user.save();
    await user.populate({ path: "cart.productId", model: "product" });
    res.json({ result: true, cart: user.cart });
  } catch (e) {
    res.status(500).json({ result: false, error: e.message });
  }
});

// Get Cart
router.get("/cart", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "cart.productId",
      model: "product",
    });
    if (!user)
      return res.status(404).json({ result: false, error: "User not found" });

    const cart = user.cart || [];

    const totals = cart.reduce(
      (acc, item) => {
        const p = item.productId?.shipping || {};
        const qty = item.quantity || 0;
    
        acc.totalWeight_g += (p.weight_g || 0) * qty;
        acc.totalVolume_cm3 += (p.length_cm || 0) * (p.width_cm || 0) * (p.height_cm || 0) * qty;
        acc.totalPrice += (item.productId?.price || 0) * qty;
        return acc;
      },
      { totalWeight_g: 0, totalVolume_cm3: 0, totalPrice: 0 }
    );
    
    totals.totalPrice = Math.round(totals.totalPrice * 100) / 100;

    // console.log("🧺 CART USER:", user.username);
    // console.log("🧾 CART ITEMS:", JSON.stringify(cart, null, 2));
    console.log("⚖️ TOTALS:", totals);

    res.json({
      result: true,
      cart,
      totals,
    });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

// Add Resa
router.post("/cart/add-reservation", async (req, res) => {
  try {
    const productId = process.env.BOOKING_DEPOSIT_PRODUCT_ID;
    const quantity = 1;

    if (!productId) {
      return res
        .status(500)
        .json({ result: false, error: "BOOKING_DEPOSIT_PRODUCT_ID not set" });
    }

    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ result: false, error: "User not found" });

    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ result: false, error: "Deposit product not found" });

    const idx = (user.cart || []).findIndex(
      (i) => String(i.productId) === String(productId)
    );

    if (idx >= 0) {
      user.cart[idx].quantity += quantity;
    } else {
      (user.cart || (user.cart = [])).push({ productId, quantity });
    }

    await user.save();
    await user.populate({ path: "cart.productId", model: "product" });

    res.json({ result: true, cart: user.cart });
  } catch (error) {
    console.error("❌ POST /shop/cart/add-reservation error:", error);
    res.status(500).json({ result: false, error: error.message });
  }
});


// Add to Cart
router.post("/cart/add", async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body || {};
    if (!productId) {
      return res
        .status(400)
        .json({ result: false, error: "productId required" });
    }
    if (!mongoose.isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ result: false, error: "Invalid productId" });
    }
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return res.status(400).json({ result: false, error: "Bad quantity" });
    }

    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ result: false, error: "User not found" });

    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ result: false, error: "Product not found" });

    const idx = (user.cart || []).findIndex(
      (i) => String(i.productId) === String(productId)
    );
    if (idx >= 0) user.cart[idx].quantity += quantity;
    else (user.cart || (user.cart = [])).push({ productId, quantity });

    await user.save();
    await user.populate({ path: "cart.productId", model: "product" });
    res.json({ result: true, cart: user.cart });
  } catch (error) {
    console.error("❌ POST /shop/cart/add error:", error);
    res.status(500).json({ result: false, error: error.message });
  }
});

// Patch Qty
router.patch("/cart/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    let { quantity } = req.body;
    quantity = Number.isFinite(quantity) ? Math.max(0, quantity | 0) : 1;

    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ result: false, error: "User not found" });

    const idx = (user.cart || []).findIndex(
      (i) => String(i.productId) === String(productId)
    );
    if (idx === -1)
      return res.status(404).json({ result: false, error: "Item not in cart" });

    if (quantity <= 0) {
      user.cart.splice(idx, 1);
    } else {
      user.cart[idx].quantity = quantity;
    }

    await user.save();
    await user.populate({ path: "cart.productId", model: "product" });
    res.json({ result: true, cart: user.cart });
  } catch (e) {
    res.status(500).json({ result: false, error: e.message });
  }
});

// Delete to Cart
router.delete("/cart/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ result: false, error: "User not found" });

    user.cart = (user.cart || []).filter(
      (i) => String(i.productId) !== String(productId)
    );
    await user.save();

    await user.populate({ path: "cart.productId", model: "product" });
    res.json({ result: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

module.exports = router;
