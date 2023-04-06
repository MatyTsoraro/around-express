const express = require('express');
const mongoose = require('mongoose');

const app = express();

/// ///////////////////////////////////////////////////////////////////

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');
/// ///////////////////////////////////////////////////////////////////

const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { customError } = require('./utils/consts');
/// ///////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
  req.user = {
    _id: '642336d883cf88e0204620bd',
  };
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(cardRouter);
app.use((req, res) => {
  customError(res, 404, 'Requested resource not found');
});
/// ///////////////////////////////////////////////////////////////////

/// ///////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`App listiening on port ${PORT}`);
});
