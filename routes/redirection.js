const express = require('express');
const DeviceDetector = require("device-detector-js");
const moment = require('moment');

const { client } = require('../config/db');
const auth = require('../middleware/auth');
const Url = require('../models/url');
const errors = require('../config/errors')

const router = express.Router();

router.get('/:urlCode', auth, async (req, res) => {
  const deviceDetector = new DeviceDetector();
  const userAgent = req.get('user-agent');
  const device = deviceDetector.parse(userAgent);
  const browser = null;
  const deviceType = null;
  const {urlCode} = req.params;
  const userId = req.user._id;
  
  try {
    client.get(urlCode, function(err, obj){
        if(!obj){
          res.send(errors.USER_DOSE_NOT_EXIST);
        } else {
          res.redirect(obj);
        }
      });
      
    if(device.client != null)  browser = device.client.name;
    if(device.device != null)  deviceType = device.device.type;
    
    await Url.findOneAndUpdate({urlCode}, {
        $push: { 
          views: {
            userId,
            browser,
            deviceType,
            createdAt: moment(),
          }
        } ,
      }, { new: true });

  } catch (err) {
    res.status(406).json(errors.CANNOT_INSERT_NEW_VIEW);
  }
});

module.exports = router;