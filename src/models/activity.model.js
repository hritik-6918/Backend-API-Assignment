const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  dateTime: {
    type: Date,
    required: [true, 'Date and time are required'],
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1'],
  },
  availableSpots: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['sports', 'movies', 'music', 'theatre', 'other'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'completed'],
    default: 'active',
  },
}, {
  timestamps: true,
});

// Set availableSpots equal to capacity when creating new activity
activitySchema.pre('save', function(next) {
  if (this.isNew) {
    this.availableSpots = this.capacity;
  }
  next();
});

module.exports = mongoose.model('Activity', activitySchema); 