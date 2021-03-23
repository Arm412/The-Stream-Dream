const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const twitchAPI = require('./routes/twitchRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:3000',
		methods: ['GET', 'PUT', 'POST'],
	})
);

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

app.get('/', (req, res) => {
	if (!req.session.visited) {
		console.log('New Session');
		req.session.visited = true;
		res.send(true);
	} else {
		console.log('Old Session');
		res.send(false);
	}
});

app.use((req, res) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Content-Type', 'application/json;charset=UTF-8');
	res.header('Access-Control-Allow-Credentials', true);
	if (req.method === 'OPTIONS') {
		res.header('Access=Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	}
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log('Listening on Port: ' + PORT);
});
