// @ts-check
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      where: { status: 'active' },
      include: { model: Review },
    });
    res.status(200).json({
      status: 'Success',
      data: {
        restaurants,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getOneRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({
      where: { id },
    });
    res.status(200).json({
      status: 'Success',
      data: {
        restaurant,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createRestaurant = async (req, res) => {
  try {
    const { name, address, rating } = req.body;
    const newRestaurant = await Restaurant.create({ name, address, rating });

    res.status(201).json({
      status: 'success',
      data: { newRestaurant },
    });
  } catch (error) {
    console.log(error);
  }
};

const updatedRestaurant = async (req, res) => {
  try {
    const { name, address } = req.body;
    const { restaurant } = req;

    await restaurant.update({ name, address });

    res.status(200).json({
      status: 'Success',
      data: { restaurant },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { restaurant } = req;
    await restaurant.update({ status: 'deleted' });
    res.status(200).json({
      status: 'Success',
    });
  } catch (error) {
    console.log(error);
  }
};

const createReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { restaurantId } = req.params;
    const { sessionUser } = req;
    const review = await Review.create({
      comment,
      rating,
      restaurantId,
      userId: sessionUser.id,
    });
    res.status(201).json({
      status: 'Success',
      data: review,
    });
  } catch (error) {
    console.log(error);
  }
};

const updatedReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;

    const { review } = req;

    await review.update({ comment, rating });
    res.status(200).json({
      status: 'Success',
      data: { review },
    });
  } catch (error) {
    console.log(error);
  }
};

const deletedReview = async (req, res) => {
  try {
    const { review } = req;
    await review.update({ status: 'deleted' });
    res.status(200).json({
      status: 'Success',
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllRestaurants,
  getOneRestaurant,
  updatedRestaurant,
  createRestaurant,
  deleteRestaurant,
  createReview,
  updatedReview,
  deletedReview,
};
