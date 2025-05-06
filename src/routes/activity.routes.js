const express = require('express');
const Activity = require('../models/activity.model');
const Booking = require('../models/booking.model');
const auth = require('../middleware/auth.middleware');
const { validateActivity, validate } = require('../middleware/validation.middleware');

const router = express.Router();

// Get all activities (public)
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find({ status: 'active' })
      .select('-__v')
      .sort({ dateTime: 1 });

    res.json({
      success: true,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching activities',
      error: error.message,
    });
  }
});

// Get single activity (public)
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).select('-__v');
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found',
      });
    }

    res.json({
      success: true,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching activity',
      error: error.message,
    });
  }
});

// Book an activity (protected)
router.post('/book/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found',
      });
    }

    if (activity.availableSpots < 1) {
      return res.status(400).json({
        success: false,
        message: 'No available spots for this activity',
      });
    }

    // Check if user already booked this activity
    const existingBooking = await Booking.findOne({
      user: req.user._id,
      activity: activity._id,
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked this activity',
      });
    }

    // Create booking
    const booking = new Booking({
      user: req.user._id,
      activity: activity._id,
    });

    await booking.save();

    // Update available spots
    activity.availableSpots -= 1;
    await activity.save();

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Activity booked successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error booking activity',
      error: error.message,
    });
  }
});

module.exports = router; 