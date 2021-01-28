const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());

app.get('/getGames', require('./routes/gameRoutes'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Controll-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Listening on Port: " + PORT);
});