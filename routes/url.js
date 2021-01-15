const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const { client } = require('../config/db');
const auth = require('../middleware/auth');


const Url = require('../models/Url');



// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', auth, async (req, res) => {

  const { longUrl } = req.body;
  // const baseUrl = config.get('baseUrl');

//   // Check base url
//   if (!validUrl.isUri(baseUrl)) {
//     return res.status(401).json('Invalid base url');
//   }

  // Create url code
  const urlCode = shortid.generate();



  // Check long url
  if (validUrl.isUri(longUrl)) {

    try {
      let url = await Url.findOne({ urlCode: urlCode });

      if (url) {
        res.json(url);
      } else {
        // const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          creator_id: req.user._id,
          urlCode: urlCode,
        });

        await url.save();

        res.json(url);
      }

      // for redis database
      client.set(urlCode, longUrl);

    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;