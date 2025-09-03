const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} = require('../controllers/cartController');

// All cart routes are protected
router.route('/')
  .get(protect, getCart)
  .post(protect, addToCart)
  .delete(protect, clearCart);

router.route('/:productId')
  .delete(protect, removeFromCart)
  .put(protect, updateCartItem);

module.exports = router;