const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');

dotenv.config();

const protectSession = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(403).json({
        status: 'Error',
        message: 'Invalid token',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SIGNATURE);

    const user = await User.findOne({ where: { id: decoded.id, status: 'active' } });
    if (!user) {
      return res.status(403).json({
        status: 'Error',
        message: 'The owner of the session is no long active',
      });
    }

    req.sessionUser = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const protectUserId = (req, res, next) => {
  const { sessionUser, user } = req;
  if (sessionUser.id !== user.id) {
    return res.status(403).json({
      status: 'Error',
      message: 'You are not the owner of this account.',
    });
  }
  next();
};

const protectAdminRole = (req, res, next) => {
  const { sessionUser } = req;
  if (sessionUser.role !== 'admin') {
    return res.status(403).json({
      status: 'Error',
      message: 'You do not have a access level required',
    });
  }
  next();
};

const protectOrderOwners = (req, res, next) => {
  const { sessionUser, order } = req;
  if (sessionUser.id !== order.userId) {
    return res.status(403).json({
      status: 'error',
      message: 'Sorry... this is not your order',
    });
  }
  next();
};

const protectReviesOwners = (req, res, next) => {
  const { sessionUser, review } = req;
  if (sessionUser.id !== review.userId) {
    return res.status(403).json({
      status: 'error',
      message: 'Sorry... this is not your review',
    });
  }
  next();
};
module.exports = {
  protectAdminRole,
  protectSession,
  protectUserId,
  protectOrderOwners,
  protectReviesOwners,
};
