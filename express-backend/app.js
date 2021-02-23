const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

app.get('/getGames', require('./routes/twitchRoutes'));
app.get('/findChannels', require('./routes/twitchRoutes'));
app.get('/login', require('./routes/twitchRoutes'));
app.post('/setUserToken', require('./routes/twitchRoutes'));

app.use((req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    }
});



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Listening on Port: " + PORT);
});