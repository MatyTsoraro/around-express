const mongoose = require('mongoose');
const express = require('express');
const users = require('./routes/users');
const cards = require('./routes/cards');
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  //useCreateIndex: true, // This option is no longer needed in Mongoose 6
  //useFindAndModify: false, // This option is no longer needed in Mongoose 6
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB database');
}).catch((err) => {
  console.error(`Error connecting to MongoDB database: ${err}`);
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

// The following route handles all requests that do not match the above routes.
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(3000, () => console.log('Server is listening on port 3000'));
