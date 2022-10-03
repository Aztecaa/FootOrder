const express = require('express');

const {
  getAllRestaurants,
  getOneRestaurant,
  updatedRestaurant,
  createRestaurant,
  deleteRestaurant,
  createReview,
  deletedReview,
  updatedReview,
} = require('../controllers/restaurants.controller');

const {
  protectAdminRole,
  protectSession,
  protectReviesOwners,
} = require('../middlewares/auth.middleware');
const { createRestaurantValidators } = require('../middlewares/validation.middleware');
const { restaurantExist } = require('../middlewares/restaurant.middleware');
const { reviewExist } = require('../middlewares/review.middleware');

const restaurantRouter = express.Router();

restaurantRouter.get('/', getAllRestaurants);
restaurantRouter.get('/:id', getOneRestaurant);

restaurantRouter.use(protectSession);

restaurantRouter.post('/', createRestaurantValidators, createRestaurant);
restaurantRouter.patch('/:id', restaurantExist, protectAdminRole, updatedRestaurant);
restaurantRouter.delete('/:id', restaurantExist, protectAdminRole, deleteRestaurant);
restaurantRouter.post('/reviews/:restaurantId', createReview);
restaurantRouter.patch('/reviews/:id', reviewExist, protectReviesOwners, updatedReview);
restaurantRouter.delete('/reviews/:id', reviewExist, protectReviesOwners, deletedReview);

module.exports = { restaurantRouter };
