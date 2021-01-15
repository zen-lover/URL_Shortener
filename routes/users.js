const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');

const {User} = require('../models/user');
const errors = require('../config/Errors');

const router = express.Router();

router.post('/', async (req, res) => {
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
  const salt = await bcrypt.genSalt();
  password = await bcrypt.hash(password, salt);
  console.log(password);

  let user = await User.findOne({ email, password});
  if (!user) return res.status(406).send(errors.USER_DOSE_NOT_EXIST);

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router; 