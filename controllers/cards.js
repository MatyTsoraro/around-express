const Card = require('../models/card');
const { customError, HTTP_STATUS_CODES } = require('../utils/consts');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(HTTP_STATUS_CODES.OK).send({ data: cards }))
    .catch(() => customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error'));
};

const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const { _id } = req.user;

  Card.create({
    name,
    link,
    likes,
    owner: _id,
  })
    .then((card) => res.status(HTTP_STATUS_CODES.CREATED).send({ data: card }))
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

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .orFail(() => {
      const error = new Error('no Card found for the specified id');
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'Invalid Card ID');
      } else if (err.statusCode === HTTP_STATUS_CODES.NOT_FOUND) {
        customError(res, HTTP_STATUS_CODES.NOT_FOUND, err.message);
      } else {
        customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error');
      }
    });
};

const updateLikes = (req, res, operator) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId, // searches for the card on the database
    { [operator]: { likes: _id } }, // $pull / $addToSet
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Card is not found');
      error.status = HTTP_STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'Card id is incorrect');
      } else if (err.status === HTTP_STATUS_CODES.NOT_FOUND) {
        customError(res, HTTP_STATUS_CODES.NOT_FOUND, 'Invalid user id');
      } else {
        customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');
      }
    });
};

const likeCard = (req, res) => updateLikes(req, res, '$addToSet');

const unlikeCard = (req, res) => updateLikes(req, res, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
