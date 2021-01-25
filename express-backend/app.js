const express = require('express');
app = express();

require('dotenv').config();

app.use('/getGames', require('./routes/hello'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Listening on Port: " + PORT);
});