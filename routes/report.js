const auth = require('../middleware/auth');
const Url = require('../models/Url');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/today/:code', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    const url = await Url.findOne({urlCode: req.params.code});
    if(url.creator_id === req.user._id){
        res.send(url.views);
    }else{
        res.status(401).send('Access denied.');
    }
});
router.get('/lastDay/:code', auth, async (req, res) => {
});
router.get('/lastWeek/:code', auth, async (req, res) => {
});
router.get('/LastMonth/:code', auth, async (req, res) => {
});


module.exports = router; 