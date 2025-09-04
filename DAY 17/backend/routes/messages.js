const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

// @route   POST /api/messages
// @desc    Send a new message
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { recipient, content } = req.body;

    // Create message
    const message = await Message.create({
      sender: req.user.id,
      recipient,
      content
    });

    // Populate sender info
    const populatedMessage = await Message.findById(message._id).populate('sender', 'username');

    res.status(201).json({
      success: true,
      message: populatedMessage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/messages/:userId
// @desc    Get messages between current user and another user
// @access  Private
router.get('/:userId', protect, async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentUserId = req.user.id;

    // Get messages between the two users
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, recipient: userId },
        { sender: userId, recipient: currentUserId }
      ]
    })
      .sort({ timestamp: 1 })
      .populate('sender', 'username');

    // Mark messages as read
    await Message.updateMany(
      { sender: userId, recipient: currentUserId, read: false },
      { read: true }
    );

    res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/messages/global
// @desc    Get global chat messages
// @access  Private
router.get('/global/chat', protect, async (req, res) => {
  try {
    // Get global messages
    const messages = await Message.find({ recipient: 'global' })
      .sort({ timestamp: 1 })
      .populate('sender', 'username');

    res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;