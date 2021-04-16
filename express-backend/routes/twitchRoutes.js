const express = require('express');
const router = express.Router();
const path = require('path');
const twitchAPI = require(path.resolve('./controllers/twitchapi.js'));
const { check, validationResult, sanitizeQuery } = require('express-validator');

// Paths to query the Twitch API

router.get('/getGames', twitchAPI.getTopGames);

router.get(
	'/findChannels',
	check('user', 'Invalid User Input').trim().escape(),
	twitchAPI.findChannels
);

router.post(
	'/getMedia',
	check('id', 'Invalid User Input').trim().escape(),
	twitchAPI.getMedia
);

router.get('/checkSession', twitchAPI.checkSession);

module.exports = router;
