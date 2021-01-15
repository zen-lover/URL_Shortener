const { client } = require('../config/db');
const DeviceDetector = require("device-detector-js");
const express = require('express');
const router = express.Router();

const Url = require('../models/Url');


client.on('connect', function(){
    console.log('Connected to Redis...');
  });

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async (req, res) => {
  try {
    
    client.get(req.params.code, function(err, obj){
        if(!obj){
          res.send('User does not exist');
        } else {
          res.redirect(obj);
        }
      });

    const deviceDetector = new DeviceDetector();
    const userAgent = req.get('user-agent');
    const device = deviceDetector.parse(userAgent);
    async () => {

      const url = await Url.findOneAndUpdate({urlCode: req.params.code}, {
        $set: { "views.totalView": 1} ,
      }, { new: true });

      
      // const browser = device.client.name;
      // const type = device.device.type;
      return;
    };

  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;