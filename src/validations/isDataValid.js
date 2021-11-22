const jwt = require('jsonwebtoken');

const isDataUserValid = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) { 
    return res.status(400).json({ message: 'Email and Password are mandatory!' });
  }

  if (!email.includes('@')) {
    return res.status(401).json({
      message: 'Incorrect Email',
    });
  }

  next();
};

const areNumbersValid = (req, res, next) => {
  const { numbersToAdd, numbersToSub } = req.body;

  if (!numbersToAdd || !numbersToSub) {
    return res.status(400).json({ message: 'Both Arrays are mandatory!' });
  }

  next();
};

const isTokenValid = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.SECRET;

  if (!token) {
    return res.status(401).json({
      message: 'missing auth token',
    });
  }

  try {
    const payload = jwt.verify(token, secret);

    req.user = payload;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'jwt malformed',
    });
  }
};

module.exports = {
  isDataUserValid,
  areNumbersValid,
  isTokenValid,
};