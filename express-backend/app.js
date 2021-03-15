const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const twitchAPI = require('./routes/twitchRoutes');

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

app.use('/twitch', twitchAPI);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Listening on Port: " + PORT);
});