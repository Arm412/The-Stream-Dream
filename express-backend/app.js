const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const twitchAPI = require('./routes/twitchRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
let ip = require('ip');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'react-client', 'build')));

const dbString = 'mongodb://127.0.0.1:27017/sessionsDB';

try {
	app.use(
		session({
			key: 'sessionID',
			secret: process.env.MONGO_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				maxAge: parseInt(process.env.SESSION_MAX_AGE),
				secure: false,
			},
			store: MongoStore.create({
				mongoUrl: dbString,
				collectionName: 'sessions',
			}),
		})
	);
} catch (err) {
	console.log('There was a problem creating the session store.');
	console.log(err);
}

app.use(express.json());
app.use(cookieParser());

app.use('/twitch', twitchAPI);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'react-client/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(ip.address());
	console.log('Listening on Port: ' + PORT);
});
