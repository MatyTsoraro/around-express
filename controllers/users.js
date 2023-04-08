const User = require('../models/user');
const { customError, HTTP_STATUS_CODES } = require('../utils/consts');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(HTTP_STATUS_CODES.OK).send({ data: users }))
    .catch(() => customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error'));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('User Not Found');
      error.status = HTTP_STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((user) => {
      res.status(HTTP_STATUS_CODES.OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'Invalid user ID');
      } else if (err.status === HTTP_STATUS_CODES.NOT_FOUND) {
        customError(res, HTTP_STATUS_CODES.NOT_FOUND, 'User ID not found');
      } else {
        customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error');
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(HTTP_STATUS_CODES.CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else {
        customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error');
      }
    });
};

const updateUserData = (req, res) => {
  const id = req.user._id;
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(id, { name, about, avatar }, { runValidators: true })
    .orFail(() => {
      const error = new Error('User ID not found');
      error.status = HTTP_STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'Invalid user ID');
      } else if (err.status === HTTP_STATUS_CODES.NOT_FOUND) {
        customError(res, HTTP_STATUS_CODES.NOT_FOUND, 'User ID not found');
      } else {
        customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error');
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  if (!name || !about) {
    return customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'Please update both name and about fields');
  }
  return updateUserData(req, res);
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    return customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'Please update avatar');
  }
  return updateUserData(req, res);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
