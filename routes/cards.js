const express = require('express');
const readCards = require('../helpers/readCards');

const router = express.Router();

router.get('/', (req, res) => {
  readCards()
    .then((cards) => res.json(cards))
    .catch(() =>
      res.status(500).json({ message: 'An error has occurred on the server' })
    );
});

module.exports = router;
