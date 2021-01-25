const express = require('express');
router = express.Router();
test = require('../controllers/hello')

router.get('/getGames', test.getTopGames);

module.exports = router;