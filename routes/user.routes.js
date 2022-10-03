const express = require('express');

const {
  getAllUsers,
  createUser,
  login,
  deleteUser,
  updatedUser,
  getAllOrdersByUser,
  getOnlyOrderByUser,
} = require('../controllers/user.controller');

const {
  protectAdminRole,
  protectSession,
  protectUserId,
  protectOrderOwners,
} = require('../middlewares/auth.middleware');

const { createUserValidators } = require('../middlewares/validation.middleware');

const { userExist } = require('../middlewares/users.middleware');

const { orderExist } = require('../middlewares/order.middleware');

const userRouter = express.Router();

//endpoints
userRouter.get('/', protectSession, protectAdminRole, getAllUsers);
userRouter.post('/singup', createUserValidators, createUser);
userRouter.patch('/:id', protectSession, userExist, protectUserId, updatedUser);
userRouter.delete('/:id', protectSession, userExist, protectUserId, deleteUser);
userRouter.post('/login', login);
userRouter.get('/orders', protectSession, getAllOrdersByUser);
userRouter.get('/orders/:id', protectSession, orderExist, protectOrderOwners, getOnlyOrderByUser);

module.exports = { userRouter };
