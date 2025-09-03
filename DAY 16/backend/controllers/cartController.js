const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      'cartItems.product',
      'name image price countInStock'
    );

    if (!cart) {
      // Create a new cart if one doesn't exist
      cart = await Cart.create({
        user: req.user._id,
        cartItems: [],
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    // Validate product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    if (product.countInStock < qty) {
      res.status(400);
      throw new Error('Not enough stock available');
    }

    // Find user's cart or create one
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        cartItems: [],
      });
    }

    // Check if item already exists in cart
    const existItem = cart.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (existItem) {
      // Update quantity if item exists
      existItem.qty = qty;
    } else {
      // Add new item to cart
      cart.cartItems.push({
        product: productId,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      });
    }

    await cart.save();

    // Return updated cart with populated product info
    const updatedCart = await Cart.findById(cart._id).populate(
      'cartItems.product',
      'name image price countInStock'
    );

    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
exports.removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }

    // Filter out the item to remove
    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
exports.updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body;
    const productId = req.params.productId;

    // Validate product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    if (product.countInStock < qty) {
      res.status(400);
      throw new Error('Not enough stock available');
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }

    // Find the item to update
    const itemToUpdate = cart.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (!itemToUpdate) {
      res.status(404);
      throw new Error('Item not found in cart');
    }

    // Update quantity
    itemToUpdate.qty = qty;

    await cart.save();

    // Return updated cart with populated product info
    const updatedCart = await Cart.findById(cart._id).populate(
      'cartItems.product',
      'name image price countInStock'
    );

    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }

    cart.cartItems = [];
    await cart.save();

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};