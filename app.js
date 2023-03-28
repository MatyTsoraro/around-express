const mongoose = require('mongoose');
const express = require('express');
// Import the users and cards controllers
const users = require('./controllers/users');
const cards = require('./controllers/cards');
// Import the cards router
const cardsRouter = require('./routes/cards');
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
app.post('/users', users.createUser);

// The following route gets a single user by ID using the database.
app.get('/users/:id', users.getUserById);

// The following route updates the profile using the database.
app.patch('/users/me', users.updateProfile);

// The following route updates the avatar using the database.
app.patch('/users/me/avatar', users.updateAvatar);

// The following route deletes a card by ID using the database.
app.delete('/cards/:cardId', cards.deleteCardById);

// The following route likes a card by ID using the database.
app.put('/cards/:cardId/likes', cards.likeCard);

// The following route unlikes a card by ID using the database.
app.delete('/cards/:cardId/likes', cards.unlikeCard);

// The following route gets a card by ID using the database.
app.use('/cards', cardsRouter);