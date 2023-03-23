// Import express and create a router object
const express = require('express');
const router = express.Router();

// Import the user model
const User = require('../models/user');


// GET /users - returns all users
router.get('/users', (req, res) => {
  // Find all users in the database
  User.find({})
    .then(users => {
      // Send the users as a JSON response
      res.json(users);
    })
    .catch(err => {
      // Handle any errors
      res.status(500).json({ message: err.message });
    });
});

// GET /users/:userId - returns a user by _id
router.get('/users/:userId', (req, res) => {
  // Get the user id from the request parameters
  const userId = req.params.userId;
  // Find the user by id in the database
  User.findById(userId)
    .then(user => {
      // Check if the user exists
      if (user) {
        // Send the user as a JSON response
        res.json(user);
      } else {
        // Send a 404 error if the user is not found
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      // Handle any errors
      res.status(500).json({ message: err.message });
    });
});

// POST /users - creates a new user
router.post('/users', (req, res) => {
  // Get the user data from the request body
  const { name, about, avatar } = req.body;
  // Create a new user instance with the data
  const user = new User({ name, about, avatar });
  // Save the user to the database
  user.save()
    .then(user => {
      // Send the created user as a JSON response
      res.status(201).json(user);
    })
    .catch(err => {
      // Handle any errors
      res.status(400).json({ message: err.message });
    });
});

// Export the router object
module.exports = router;