const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  //useCreateIndex: true, // This option is no longer needed in Mongoose 6
  //useFindAndModify: false, // This option is no longer needed in Mongoose 6
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

const express = require('express');
const users = require('./routes/users'); // Import the users router
app.use('/users', users); // Use the users router for requests starting with /users

// The following two lines are importing the same module.
const readCards = require('./routes/cards');
const readUsers = require('./routes/users');

const app = express();

// The following route is using the readCards module, but it is not imported.
app.get('/cards', (req, res) => {
  readCards() // This will throw an error because readCards is not defined
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server.' }));
});

// The following route is using the readUsers module correctly.
app.get('/users', (req, res) => {
  readUsers()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server.' }));
});

// The following route is trying to get a single user by ID, but it is not using the database.
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  return readUsers() // This will throw an error because readUsers is not defined
    .then((data) => {
      const user = data.find((u) => u._id === id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server.' }));
});

// The following route will handle all requests that do not match the above routes.
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(3000, () => console.log('Server is listening on port 3000'));
