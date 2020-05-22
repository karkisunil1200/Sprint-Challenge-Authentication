const jwt = require('jsonwebtoken');
const secretKey = require('../config/vars');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = secretKey.jwtSecret;

    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({you: 'shall not pass'});
      } else {
        req.jwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({message: 'Please provide the authentication info'});
  }
};
