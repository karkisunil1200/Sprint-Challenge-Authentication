const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const Users = require('../users/users-model');
const jwt = require('jsonwebtoken');
const secret = require('../config/vars');

router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(credentials.password, rounds);
  credentials.password = hash;

  Users.addUsers(credentials)
    .then(count => {
      res.status(200).json({message: 'success'});
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body;

  Users.findBy({username})
    .then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({welcome: user.username, token});
      } else {
        res.status(404).json({error: 'Enter correct username and password'});
      }
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
});

const generateToken = user => {
  const payload = {
    sub: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret.jwtSecret, options);
};

module.exports = router;
