const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const twitchAPI = require('./routes/twitchRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const dbString = 'mongodb://127.0.0.1:27017/sessionsDB';
app.use(session({
  key: 'sessionID',
  secret: process.env.MONGO_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    maxAge: parseInt(process.env.SESSION_MAX_AGE),
    secure: false
  },
  store: MongoStore.create({ 
    mongoUrl: dbString,
    collectionName: 'sessions'
   })
}));

app.use(express.json());
app.use(cookieParser());

app.use('/twitch', twitchAPI);

app.get("/", (req, res) => {
  if (!req.session.visited) {
    console.log('New Session');
    req.session.visited = true;
    res.send(true);
  } else {
    console.log('Old Session');
    res.send(false);
  }
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Listening on Port: " + PORT);
});