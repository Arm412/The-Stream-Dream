const express = require('express');
const router = express.Router();
const path = require('path');
const twitchAPI = require(path.resolve('./controllers/twitchapi.js'));
const login = require(path.resolve('./controllers/login'));

// Paths to query the Twitch API

router.get('/getGames', twitchAPI.getTopGames);

router.get('/findChannels', twitchAPI.findChannels);

router.post('/getMedia', twitchAPI.getMedia);

router.post('/profileData', twitchAPI.profileData);

// Paths handling logging in with twitch

router.get('/login', login.authorizeLogin);

module.exports = router;
