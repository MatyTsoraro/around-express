const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Middleware function to add user object to request
const addUserToObject = (req, res, next) => {
  req.user = {
    _id: '642336d883cf88e0204620bd' // paste the _id of the test user created in the previous step
  };
  next();
};

// The following function reads all users from the database.
const readUsers = () => {
  return User.find({});
};

// The following function creates a new user in the database.
const createUser = (name, about, avatar) => {
  return User.create({ name, about, avatar });
};

module.exports = {
  addUserToObject,
  readUsers,
  createUser,
};
