const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const getAllOrders = async (req, res) => {
  try {
    const { sessionUser } = req;
    const orders = await Order.findAll({
      where: { userId: sessionUser.id },
      include: {
        model: Meal,
        attributes: ['id', 'name', 'price', 'restaurantId', 'status'],
        include: { model: Restaurant, attributes: ['id', 'name', 'address', 'rating', 'status'] },
      },
    });
    res.status(200).json({
      status: 'Success',
      data: {
        orders,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createOrders = async (req, res) => {
  try {
    const { quantity, mealId } = req.body;
    const { sessionUser } = req;
    const meal = await Meal.findOne({
      where: { id: mealId, status: 'active' },
    });

    if (!meal) {
      return res.status(404).json({
        status: 'Error',
        message: 'This meal is not active or exist',
      });
    }

    const newOrder = await Order.create({
      quantity,
      mealId,
      userId: sessionUser.id,
      totalPrice: quantity * meal.price,
    });

    res.status(201).json({
      status: 'success',
      data: { newOrder },
    });
  } catch (error) {
    console.log(error);
  }
};

const updatedOrders = async (req, res) => {
  try {
    const { order } = req;
    if (order.status === 'active') {
      await order.update({ status: 'completed' });
    } else {
      return res.status(404).json({
        status: 'error',
        message: `Sorry... this order is already ${order.status}`,
      });
    }
    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOrders = async (req, res) => {
  try {
    const { order } = req;
    if (order.status === 'active') {
      await order.update({ status: 'cancelled' });
    } else {
      return res.status(404).json({
        status: 'error',
        message: `Sorry... this order is already ${order.status}`,
      });
    }
    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createOrders, deleteOrders, getAllOrders, updatedOrders };
