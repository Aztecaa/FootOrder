// @ts-check
const dotenv = require('dotenv');

const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

dotenv.config();

const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.findAll({
      where: { status: 'active' },
      include: { model: Restaurant, attributes: ['id', 'name', 'address'] },
    });
    res.status(200).json({
      status: 'Success',
      data: {
        meals,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getOneMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findOne({
      where: { id },
      include: { model: Restaurant, attributes: ['id', 'name', 'address'] },
    });
    res.status(200).json({
      status: 'Success',
      data: {
        meal,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createMeal = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { restaurant } = req;
    const newMeal = await Meal.create({ name, price, restaurantId: restaurant.id });

    res.status(201).json({
      status: 'success',
      data: { newMeal },
    });
  } catch (error) {
    console.log(error);
  }
};

const updatedMeal = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { meal } = req;

    await meal.update({ name, price });

    res.status(200).json({
      status: 'Success',
      data: { meal },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteMeal = async (req, res) => {
  try {
    const { meal } = req;

    await meal.update({ status: 'deleted' });
    res.status(200).json({
      status: 'Success',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllMeals, createMeal, deleteMeal, getOneMeal, updatedMeal };
