const express = require('express');
const users = require('./users.json');
const cards = require('./cards.json');

const app = express();
const port = 3000;

//const path = require('path');
//const usersFilePath = path.resolve(__dirname, 'users.json');


// Route to get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Route to get all cards
app.get('/cards', (req, res) => {
  res.json(cards);
});

// Route to get a specific user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user._id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User ID not found' });
  }
});

// Route for non-existent addresses
app.use((req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
