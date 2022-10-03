const { Review } = require('../models/review.model');

const reviewExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findOne({ where: { id }, status: 'active' });
    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'review not found',
      });
    }
    req.review = review;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { reviewExist };
