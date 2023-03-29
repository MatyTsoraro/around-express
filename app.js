const mongoose = require('mongoose');
const express = require('express');
// Import the users and cards controllers
const users = require('./controllers/users.js');
const cards = require('./controllers/cards');
// Import the cards and users routers
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/aroundb', {
  useNewUrlParser: true,
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

// Mount the cards router on '/cards' path
app.use('/cards', cardsRouter);

// Mount the users router on '/users' path
app.use('/users', usersRouter);
// The following route creates a new user using the database.
app.post('/users', users.create);

// The following route gets a single user by ID using the database.
app.get('/users/:id', users.getUserById);

// The following route updates the profile using the database.
app.patch('/users/me', users.updateProfile);

// The following route updates the avatar using the database.
app.patch('/users/me/avatar', users.updateAvatar);

// The following route deletes a card by ID using the database.
app.delete('/cards/:cardId', cards.deleteCardById);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send({ error: 'Not found' });
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Internal server error' });
});
