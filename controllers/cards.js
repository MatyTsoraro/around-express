const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => res.status(400).send({ message: err.message }));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      if (card.owner.toString() !== owner) {
        return res.status(403).send({ message: 'Unauthorized to delete this card' });
      }
      return Card.findByIdAndRemove(cardId)
        .then(() => res.send({ message: 'Card deleted' }))
        .catch((err) => res.status(500).send({ message: err.message }));
    })
    .catch((err) => res.status(400).send({ message: err.message }));
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.send(card);
    })
    .catch((err) => res.status(400).send({ message: err.message }));
};

const unlikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.send(card);
    })
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
