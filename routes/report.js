const moment = require('moment');
const express = require('express');

const auth = require('../middleware/auth');
const Url = require('../models/url');
const errors = require('../config/errors');
const times = require('../config/times');
const types = require('../config/types');
const browsers = require('../config/browsers');
const { string } = require('joi');

const router = express.Router();

router.get('/:time/:urlCode', auth, async (req, res) => {
    const oneDaysInMiliSec =  1 * 24 * 60 * 60 * 1000;

    const creatorId = req.user._id;
    const {urlCode, time} = req.params;
    let endDate;
    let startDate;

    if (time === times.TODAY){
        endDate = moment();
        startDate = moment().startOf(times.DAY);
    }else if(time === times.LASTDAY){
        endDate = moment().startOf(times.DAY);
        startDate = endDate - oneDaysInMiliSec;
    }else if(time === times.LASTWEEK){
        const oneWeeksInMiliSec =  7 * oneDaysInMiliSec;
        endDate = moment().startOf(times.DAY);
        startDate = endDate - oneWeeksInMiliSec;
    }else if(time === times.LASTMONTH){
        const oneMonthInMiliSec =  30 * oneDaysInMiliSec;
        endDate = moment().startOf(times.DAY);
        startDate = endDate - oneMonthInMiliSec;
    }else{
        res.status(406).send(errors.WE_DO_NOT_HAVE_REPORT_FOR_THIS_TIME);
    }
    
    const url = await Url.find({creatorId, urlCode});
    if(url) {
        const view = await countingView(startDate, endDate, urlCode);
        res.send(view);
    }else{
    res.status(406).send(errors.ACCESS_DENIED);
    }
});


async function countingView(startDate, endDate, urlCode) {
    let views = {};
    const condition = {
        urlCode,
    }
    const url = await Url.findOne(condition);
    const arrayView = url.views.filter(view => (view.createdAt >= startDate && view.createdAt <= endDate));
    views.totalViews = arrayView.length;
    views.desktopViews = arrayView.filter(view => view.type === types.DESKTOP).length;
    views.mobileViews = arrayView.filter(view => view.type === types.MOBILE).length;
    views.otherViews = arrayView.filter(view => view.type === types.OTHER).length;
    views.chromeViews = arrayView.filter(view => view.browser === browsers.CHROME).length;
    views.mozilaViews = arrayView.filter(view => view.browser === browsers.MOZILA).length;
    views.otherViews = arrayView.filter(view => (view.browser !== browsers.MOZILA) && (view.browser !== browsers.CHROME)).length;
    
    views.totalDistinctViews   = [...new Set(arrayView.map(view => view.userId))].length;
    views.desktopDistinctViews = [...new Set(arrayView.filter(view => view.type === types.DESKTOP).map(view => view.userId))].length;
    views.mobileDistinctViews  = [...new Set(arrayView.filter(view => view.type === types.MOBILE).map(view => view.userId))].length;
    views.otherDistinctViews   = [...new Set(arrayView.filter(view => view.type === types.OTHER).map(view => view.userId))].length;
    views.chromeDistinctViews  = [...new Set(arrayView.filter(view => view.browser === browsers.CHROME).map(view => view.userId))].length;
    views.mozilaDistinctViews  = [...new Set(arrayView.filter(view => view.browser === browsers.MOZILA).map(view => view.userId))].length;
    views.otherDistinctViews   = [...new Set(arrayView.filter(view => (view.browser !== browsers.MOZILA) && (view.browser !== browsers.CHROME)).map(view => view.userId))].length;

    return views;
}
module.exports = router; 