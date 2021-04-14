const express = require('express');
const router = express.Router();
const path = require('path');
const twitchAPI = require(path.resolve('./controllers/twitchapi.js'));

// Paths to query the Twitch API

router.get('/getGames', twitchAPI.getTopGames);

router.get('/findChannels', twitchAPI.findChannels);

router.post('/getMedia', twitchAPI.getMedia);

router.get('/checkSession', twitchAPI.checkSession);

module.exports = router;
