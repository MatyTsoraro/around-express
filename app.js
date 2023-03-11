const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
