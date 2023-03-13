const path = require('path');
const fs = require('fs');

const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');

const readCards = () => new Promise((resolve, reject) => {
  fs.readFile(cardsPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(JSON.parse(data));
    }
  });
});

module.exports = readCards;
