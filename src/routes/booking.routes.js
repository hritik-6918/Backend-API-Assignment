const express = require('express');
const Booking = require('../models/booking.model');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// Get user's bookings (protected)
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('activity')
      .select('-__v')
      .sort({ bookingDate: -1 });

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message,
    });
  }
});

// Cancel booking (protected)
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('activity');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled',
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Increase available spots in activity
    booking.activity.availableSpots += 1;
    await booking.activity.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message,
    });
  }
});

module.exports = router; 