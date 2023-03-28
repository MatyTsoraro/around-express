// Import the Card model from your database schema
const Card = require('../models/card');

// Define the like card controller
module.exports.likeCard = (req, res) => {
  // Get the card ID from the request params
  const cardId = req.params.cardId;
  // Get the user ID from the request object
  const userId = req.user._id;
  // Like a card using the Card model and the findByIdAndUpdate method with $addToSet operator
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid card ID' });
      }
      res.status(500).send({ message: 'Server error' });
    });
};

// Define the dislike card controller
module.exports.dislikeCard = (req, res) => {
  // Get the card ID from the request params
  const cardId = req.params.cardId;
  // Get the user ID from the request object
  const userId = req.user._id;
  // Dislike a card using the Card model and the findByIdAndUpdate method with $pull operator
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid card ID' });
      }
      res.status(500).send({ message: 'Server error' });
    });
};
