const mongoConnection = require('./connection');
const jwt = require('jsonwebtoken');

const getByEmail = async (email) => {
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  // Se o email não existir, emailNotExists será nulo
  const emailNotExists = await usersCollection
    .findOne({ email });

  if (!emailNotExists) return true;

  return false;
};

const createNewUserModel = async ({ email, password }) => {
  const emailNotExists = await getByEmail(email);

  if (!emailNotExists) return false;

  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  const newUser = {
    email,
    password,
  };

  const { insertedId: id } = await usersCollection.insertOne(newUser);

  return {
    id,
  };
};

const loginUserModel = async ({ email, password }) => {
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  const user = await usersCollection.findOne({ email });

  if (!user || (user.password !== password)) return false;

  const secret = process.env.SECRET;

  const payload = {
    email,
    password,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: '1h',
  });

  return token;
}

module.exports = {
  createNewUserModel,
  loginUserModel
}