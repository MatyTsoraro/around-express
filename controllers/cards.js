const Card = require('../models/card');
const { customError } = require('../utils/consts');

// GET
const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => customError(res, 500, 'We have encountered an error'));
};

// POST
const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const { _id } = req.user;

  Card.create({
    name,
    link,
    likes,
    owner: _id,
  })
    .then((card) => res.status(201).send({ data: card }))
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

// DELETE
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const error = new Error('no Card found for the specified id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, 400, 'Invalid Card ID');
      } else if (err.statusCode === 404) {
        customError(res, 404, err.message);
      } else {
        customError(res, 500, 'We have encountered an error');
      }
    });
};

// PUT
const updateLikes = (req, res, operator) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $inc: { likes: operator } },
    { new: true },
  )
    .orFail(() => new Error('no Card found for the specified id'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, 400, 'Invalid Card ID');
      } else if (err.statusCode === 404) {
        customError(res, 404, err.message);
      } else {
        customError(res, 500, 'We have encountered an error');
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, updateLikes,
};
