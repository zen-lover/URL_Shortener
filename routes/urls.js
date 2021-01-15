const express = require('express');
const validUrl = require('valid-url');
const shortid = require('shortid');
const moment = require('moment');

const { client } = require('../config/db');
const auth = require('../middleware/auth');
const Url = require('../models/url');
const errors = require('../config/errors');

const router = express.Router();

router.post('/shorten', auth, async (req, res) => {

  const { longUrl } = req.body;
  const urlCode = shortid.generate();
  const creatorId = req.user._id

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ urlCode: urlCode });
      if (url) {
        res.json(url);
      } else {
        url = new Url({
          creatorId,
          urlCode,
          createdAt: moment()
        });
        await url.save();
        res.json(url);
      }
      client.set(urlCode, longUrl);
    } catch (err) {
      res.status(406).json(errors.ERROR_IN_CREATING_SHORT_URL);
    }
  } else {
    res.status(406).json(errors.INVALID_LONG_URL);
  }
});

module.exports = router;