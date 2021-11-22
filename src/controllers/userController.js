const {
  createNewUserModel,
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
}

module.exports = { createNewUserController }