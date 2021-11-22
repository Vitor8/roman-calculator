const {
  createNewUserModel,
  loginUserModel,
} = require('../models/usersModel');

const createNewUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await createNewUserModel({ email, password });

  if (!user) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }

  const { id } = user;

  res.status(201).json({
    message: 'User created successfully!',
    user: {
      email,
      id,
    },
  });
};

const loginUsersController = async (req, res) => {
  const { email, password } = req.body;

  const token = await loginUserModel({ email, password });

  if (!token) {
    return res.status(403).json({ message: 'Incorrect Email or Password' });
  }

  return res.status(200).json({
    token,
  });
};

module.exports = {
  createNewUserController,
  loginUsersController,
};