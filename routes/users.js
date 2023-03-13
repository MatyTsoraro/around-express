const path = require('path');
const fs = require('fs');

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

const readUsers = () => new Promise((resolve, reject) => {
  fs.readFile(usersPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(JSON.parse(data));
    }
  });
});

module.exports = readUsers;
