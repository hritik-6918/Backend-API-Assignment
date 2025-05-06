const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Please enter a valid email'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
  body('email').trim().isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

const validateActivity = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('dateTime').isISO8601().withMessage('Please enter a valid date and time'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('category')
    .isIn(['sports', 'movies', 'music', 'theatre', 'other'])
    .withMessage('Invalid category'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateActivity,
  validate,
}; 