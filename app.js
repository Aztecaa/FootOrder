const express = require('express');

const { userRouter } = require('./routes/user.routes');
const { restaurantRouter } = require('./routes/restaurants.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { orderRouter } = require('./routes/orders.routes');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `${req.method} ${req.url} doesnt exist`,
  });
});

module.exports = { app };
