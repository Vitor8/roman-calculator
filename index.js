const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

const {
  isDataUserValid,
  areNumbersValid,
  isTokenValid,
} = require('./src/validations/isDataValid');

const {
  createNewUserController,
  loginUsersController,
} = require('./src/controllers/userController');

const {
  calculateRomanController,
} = require('./src/controllers/calculatorController');

app.post('/user', isDataUserValid, createNewUserController);

app.post('/login', isDataUserValid, loginUsersController);

app.post('/calculator', isTokenValid, areNumbersValid, calculateRomanController);

app.listen(PORT, () => {
  console.log(`Aplicação ouvindo na porta ${PORT}`);
});

module.exports = app;