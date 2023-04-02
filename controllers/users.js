const User = require('../models/user');
const { customError } = require('../utils/consts');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => customError(res, 500, 'We have encountered an error'));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('User Not Found');
      error.status = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, 400, 'User ID not found');
      } else if (err.status === 404) {
        customError(res, 404, 'User ID not found');
      } else {
        customError(res, 500, 'We have encountered an error');
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else {
        customError(res, 500, 'We have encountered an error');
      }
    });
};

const updateUserData = (req, res) => {
  const id = req.user._id;
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(id, { name, about, avatar }, { runValidators: true })
    .orFail(() => new Error('User Not Found'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        customError(res, 400, err.message);
      } else if (err.name === 'CastError') {
        customError(res, 400, 'Invalid User ID');
      } else if (err.message === 'User Not Found') {
        customError(res, 404, err.message);
      } else {
        customError(res, 500, 'We have encountered an error');
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserData,
};
