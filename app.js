const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

const express = require('express');
const readCards = require('./routes/cards');
const readUsers = require('./routes/users');

const app = express();

app.get('/cards', (req, res) => {
  readCards()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server.' }));
});

app.get('/users', (req, res) => {
  readUsers()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server.' }));
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  return readUsers()
    .then((data) => {
      const user = data.find((u) => u._id === id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server.' }));
});

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(3000, () => console.log('Server is listening on port 3000'));
