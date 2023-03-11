const express = require('express');
const readUsers = require('../helpers/readUsers');
const findUserById = require('../helpers/findUserById');

const router = express.Router();

router.get('/', (req, res) => {
  readUsers()
    .then((users) => res.json(users))
    .catch(() =>
      res.status(500).json({ message: 'An error has occurred on the server' })
    );
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  findUserById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: `User ID ${id} not found` });
      }
      return res.json(user);
    })
    .catch(() =>
      res.status(500).json({ message: 'An error has occurred on the server' })
    );
});

module.exports = router;
