const express = require('express');

const {
  createMeal,
  deleteMeal,
  getAllMeals,
  getOneMeal,
  updatedMeal,
} = require('../controllers/meals.controller');

const {
  protectAdminRole,
  protectSession,
  protectUserId,
} = require('../middlewares/auth.middleware');
const { createMealsValidators } = require('../middlewares/validation.middleware');
const { mealsExist } = require('../middlewares/meals.middleware');
const { restaurantExist } = require('../middlewares/restaurant.middleware');

const mealsRouter = express.Router();

mealsRouter.get('/', getAllMeals);
mealsRouter.get('/:id', mealsExist, getOneMeal);

mealsRouter.use(protectSession);

mealsRouter.post('/:id', restaurantExist, createMealsValidators, createMeal);
mealsRouter.patch('/:id', mealsExist, protectAdminRole, updatedMeal);
mealsRouter.delete('/:id', mealsExist, protectAdminRole, deleteMeal);

module.exports = { mealsRouter };
