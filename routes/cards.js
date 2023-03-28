const express = require('express');
const router = express.Router();
const Card = require('../models/card');

router.get('/:id', (req, res) => {
  const cardId = req.params.id;

  Card.findById(cardId)
    .orFail(() => {
      const error = new Error('Card not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.statusCode) {
        res.status(error.statusCode).send({ error: error.message });
      } else {
        res.status(500).send({ error: 'Internal server error' });
      }
    });
});

module.exports = router;