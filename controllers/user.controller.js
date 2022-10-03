const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user.model');
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

dotenv.config();

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: 'Sucess',
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (role !== 'admin' && role !== 'normal') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid role',
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, role, password: hashedPassword });

    newUser.password = undefined;

    res.status(201).json({
      status: 'Sucess',
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email, status: 'active' },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: 'Error',
        message: 'Credentials Incorrect',
      });
    }

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SIGNATURE, { expiresIn: '20m' });
    res.status(200).json({
      status: 'Success',
      data: { user, token },
    });
  } catch (error) {
    console.log(error);
  }
};

const updatedUser = async (req, res) => {
  try {
    const { user } = req;
    const { name, email } = req.body;

    const updatedUser = await user.update({ name, email });
    res.status(200).json({
      status: 'Success',
      data: { updatedUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await user.update({ status: 'deleted' });
    res.status(204).json({
      status: 'Sucess',
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { sessionUser } = req;
    const orderUser = await Order.findAll({
      where: { status: 'active', userId: sessionUser.id },
      include: { model: Meal, include: { model: Restaurant } },
    });
    res.status(200).json({
      status: 'Sucess',
      data: { orderUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const getOnlyOrderByUser = async (req, res) => {
  try {
    const { order } = req;
    res.status(200).json({
      status: 'Sucess',
      data: { order },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  login,
  updatedUser,
  deleteUser,
  getAllOrdersByUser,
  getOnlyOrderByUser,
};
