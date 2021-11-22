const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

const {
  isDataUserValid
} = require('./src/validations/isDataValid');

const {
  createNewUserController,
  loginUsersController
} = require('./src/controllers/userController');

app.post('/user', isDataUserValid, createNewUserController);

app.post('/login', isDataUserValid, loginUsersController);

app.listen(PORT, () => {
  console.log(`Aplicação ouvindo na porta ${PORT}`);
}); 