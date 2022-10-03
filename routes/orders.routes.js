const express = require('express');

const {
  createOrders,
  deleteOrders,
  getAllOrders,
  updatedOrders,
} = require('../controllers/orders.controller');

const {
  protectAdminRole,
  protectSession,
  protectOrderOwners,
} = require('../middlewares/auth.middleware');

const { orderExist } = require('../middlewares/order.middleware');

const orderRouter = express.Router();

orderRouter.use(protectSession);

orderRouter.get('/me', getAllOrders);
orderRouter.post('/', createOrders);
orderRouter.patch('/:id', orderExist, protectOrderOwners, protectAdminRole, updatedOrders);
orderRouter.delete('/:id', orderExist, protectOrderOwners, protectAdminRole, deleteOrders);

module.exports = { orderRouter };
