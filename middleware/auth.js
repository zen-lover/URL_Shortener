const jwt = require('jsonwebtoken');
const config = require('config');

const errors = require('../config/errors');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(406).send(errors.ACCESS_DENIED);

  try {
    req.user = jwt.verify(token, config.get('jwtPrivateKey'));
    next();
  }
  catch (ex) {
    res.status(406).send(errors.ACCESS_DENIED);
  }
}