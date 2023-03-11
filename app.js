const express = require('express');
const readCards = require('./routes/cards');
const readUsers = require('./routes/users');

const app = express();

app.get('/cards', (req, res) => {
  readCards()
    .then((data) => res.send(data))
    .catch(() =>
      res.status(500).send({ message: 'An error has occurred on the server.' })
    );
});

app.get('/users', (req, res) => {
  readUsers()
    .then((data) => res.send(data))
    .catch(() =>
      res.status(500).send({ message: 'An error has occurred on the server.' })
    );
});

app.listen(3000, () => console.log('Server is listening on port 3000'));
