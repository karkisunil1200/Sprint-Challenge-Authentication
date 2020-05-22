const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const Users = require('../users/users-model');

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
});

module.exports = router;
