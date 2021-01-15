const { number } = require('joi');
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  creator_id: String,
  urlCode: String,

  views:{
    totalView: { type: Number, default: 0 },
    deviceType: {
      desktopView: { type: Number, default: 0 },
      mobileView: { type: Number, default: 0 },
      otherDeviceView: { type: Number, default: 0 },
    },
    browserType: {
      chromeView: { type: Number, default: 0 },
      safariView: { type: Number, default: 0 },
      firefoxView: { type: Number, default: 0 },
      operaView: { type: Number, default: 0 },
      otherBrowserView: { type: Number, default: 0 },
    },
  },
  
  distinctViews:{
    distinctTotalView: { type: Array, default: [] },
    distinctDeviceType: {
      desktopView: { type: Array, default: [] },
      mobileView: { type: Array, default: [] },
      otherDeviceView: { type: Array, default: [] },
    },
    distinctBrowserType: {
      chromeView: { type: Array, default: [] },
      safariView: { type: Array, default: [] },
      firefoxView: { type: Array, default: [] },
      operaView: { type: Array, default: [] },
      otherBrowserView: { type: Array, default: [] },
    },
  
  },
  
  date: { type: String, default: Date.now }
});

module.exports = mongoose.model('Url', urlSchema);