const { body, validationResult } = require('express-validator');

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMesage = errors.array().map((err) => {
      return err.msg;
    });
    const message = errorMesage.join('. ');
    return res.status(400).json({
      status: 'error',
      message,
    });
  }
  next();
};

const createUserValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  checkValidation,
];

const createRestaurantValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('address').isString().withMessage('Address must be a string'),
  body('rating')
    .isNumeric()
    .withMessage('Rating must be a Number')
    .isLength({ min: 0, max: 5 })
    .withMessage('Rating is a number 0 to 5')
    .notEmpty()
    .withMessage('Rating cannot be empty'),
  checkValidation,
];

const createMealsValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a Number')
    .isLength({ min: 0, max: 5 })
    .withMessage('Price is a number 0 to 5')
    .notEmpty()
    .withMessage('Price cannot be empty'),
  checkValidation,
];

module.exports = { createUserValidators, createRestaurantValidators, createMealsValidators };
