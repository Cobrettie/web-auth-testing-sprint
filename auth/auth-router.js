const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const model = require('./auth-model.js');
require("dotenv").config(); // for reading JWT_SECRET from .env file

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await model.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: 'Username is taken'
      })
    }

    const newUser = await model.addUser({
      username,
      password: await bcrypt.hash(password, 14)
    })

    if (newUser) {
      res.status(201).json({
        message: 'User created'
      })
    }

  } catch (err) {
    console.log('Error: ', err)
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await model.findBy({ username }).first();
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }

    const token = generateToken(user)
    res.cookie('token', token)
    res.json({
      message: `hey ${username}, you are logged in, I sent your token through cookies`,
      token: token
    })
  } catch (err) {
    console.log('Error: ', err)
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }

  return jwt.sign(payload, process.env.JWT_SECRET)
}

module.exports = router;
