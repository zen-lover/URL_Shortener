const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  creatorId: String,
  urlCode: String,

  views: [{
    userId: String,
    browser: String,
    deviceType: String,
    createdAt: { type: Date, default: Date.now }
  }],
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Url', urlSchema);