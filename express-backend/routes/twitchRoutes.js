const express = require('express');
router = express.Router();
twitchAPI = require('../controllers/twitchAPI.js')
login = require('../controllers/login');

router.get('/getGames', twitchAPI.getTopGames);

router.get('/findChannels', twitchAPI.findChannels);

router.get('/login', login.authorizeLogin);

router.post('/profileData', twitchAPI.profileData);

module.exports = router;