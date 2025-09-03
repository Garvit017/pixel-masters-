const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductCategories,
} = require('../controllers/productController');

// Public routes
router.route('/').get(getProducts);
router.get('/top', getTopProducts);
router.get('/categories', getProductCategories);
router.route('/:id').get(getProductById);

// Protected routes
router.route('/:id/reviews').post(protect, createProductReview);

// Admin routes
router
  .route('/')
  .post(protect, admin, createProduct);

router
  .route('/:id')
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

module.exports = router;