const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true,
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed',
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Create compound index to prevent duplicate bookings
bookingSchema.index({ user: 1, activity: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema); 