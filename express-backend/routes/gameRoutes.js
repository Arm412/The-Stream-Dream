const express = require('express');
router = express.Router();
twitchAPI = require('../controllers/twitchAPI.js')

router.get('/getGames', twitchAPI.getTopGames);

module.exports = router;