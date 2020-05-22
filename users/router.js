const express = require('express');
const Users = require('./users-model');
const restricted = require('../auth/authenticate-middleware');

const router = express.Router();

router.use(restricted);

router.get('/', (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json({data: users});
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
});

module.exports = router;
