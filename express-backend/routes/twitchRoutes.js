const express = require('express');
router = express.Router();
twitchAPI = require('../controllers/twitchAPI.js');
login = require('../controllers/login');

// Paths to query the Twitch API

router.get('/getGames', twitchAPI.getTopGames);

router.get('/findChannels', twitchAPI.findChannels);

router.post('/getMedia', twitchAPI.getMedia);

router.post('/profileData', twitchAPI.profileData);

// Paths handling logging in with twitch

router.get('/login', login.authorizeLogin);

module.exports = router;
