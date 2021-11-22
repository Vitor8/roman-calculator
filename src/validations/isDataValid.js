const isDataUserValid = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) { 
    return res.status(400).json({ message: 'Email and Password are mandatory!' })
  }

  if (!email.includes('@')) {
    return res.status(401).json({
      message: 'Incorrect Email',
    });
  }

  next();
}

module.exports = { isDataUserValid }