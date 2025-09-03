const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  createPaymentIntent,
  stripeWebhook,
} = require('../controllers/orderController');

// Public routes
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// Protected routes
router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/create-payment-intent').post(protect, createPaymentIntent);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;