const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');

const {User} = require('../models/user');
const errors = require('../config/errors');

const router = express.Router();

router.post('/register', async (req, res) => {
  const {email} = req.body;
  const salt = await bcrypt.genSalt();

  let user = await User.findOne({ email });
  if (user) return res.status(406).send(errors.USER_ALREADY_REGISTERED);

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.post('/login', async (req, res) => {
  let {email, password} = req.body;

  let user = await User.findOne({ email});
  if (!user) return res.status(406).send(errors.USER_DOSE_NOT_EXIST);

  bcrypt.compare(password, user.password, function (err, result) {
    if (result == true) {
      const token = user.generateAuthToken();
      res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    } else {
     res.send('Incorrect password');
    }
  });
  
});

module.exports = router; 