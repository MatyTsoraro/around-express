

const mongoose = require('mongoose');
const express = require('express');
const users = require('./routes/users');
const cards = require('./routes/cards');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/aroundb', {
  useNewUrlParser: true,
  //useCreateIndex: true, // This option is no longer needed in Mongoose 6
  //useFindAndModify: false, // This option is no longer needed in Mongoose 6
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB database');
}).catch((err) => {
  console.error(`Error connecting to MongoDB database: ${err}`);
});

// The following middleware adds a user object to each request.
app.use((req, res, next) => {
  req.user = {
    _id: '642336d883cf88e0204620bd' // paste the _id of the test user created in the previous step
  };

  next();
});

// The following route uses the cards module correctly.
app.get('/cards', (req, res) => {
  cards.readCards()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server.' }));
});

// The following route uses the users module correctly.
app.get('/users', (req, res) => {
  users.readUsers()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server.' }));
});

// The following route creates a new user using the database.
app.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;
  users.User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(`Error creating user: ${err}`);
      res.status(500).send({ message: 'An error has occurred on the server.' });
    });
});

// The following route gets a single user by ID using the database.
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  users.User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.error(`Error getting user with ID ${id}: ${err}`);
      res.status(500).send({ message: 'An error has occurred on the server.' });
    });
});

// The following route deletes a card by ID using the database.
app.delete('/cards/:cardId', (req, res) => {
  const { cardId } = req.params;
  cards.Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.send(card);
    })
    .catch((err) => {
      console.error(`Error deleting card with ID ${cardId}: ${err}`);
      res.status(500).send({ message: 'An error has occurred on the server.' });
    });
});

// The following route creates a new card using the database.
app.post('/cards', (req, res) => {
  const { name, link } = req.body;
  cards.Card.create({ name, link })
    .then((card) => res.send(card))
    .catch((err) => {
      console.error(`Error creating card: ${err}`);
      res.status(500).send({ message: 'An error has occurred on the server.' });
    });
});
