// Import the User model from models/user.js
const User = require('../models/user');

// The following function reads all users from the database.
const readUsers = () => {
  return User.find({});
};

// The following function creates a new user in the database.
const createUser = (name, about, avatar) => {
  return User.create({ name, about, avatar });
};

module.exports.readUsers = readUsers;
module.exports.createUser = createUser;
module.exports.User = User;