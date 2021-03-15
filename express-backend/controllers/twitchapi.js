require("dotenv").config({ path: "../.env" });
const request = require("request");

let AT = process.env.ACCESS_TOKEN;

const requestToken = (url, userCode = "") => {
	return new Promise((resolve, reject) => {
		// Request Client access token
		if (userCode === "") {
			// Set API options
			const options = {
				url: process.env.GET_TOKEN,
				json: true,
				body: {
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					grant_type: "client_credentials",
				},
			};

			request.post(options, (err, res, body) => {
				if (err) {
					return console.log(err);
				}
				console.log("Status: " + res.statusCode);
				console.log(body);

				if (res.statusCode == 200) {
					resolve(res.body.access_token);
				} else {
					reject(res.statusCode);
				}
			});
		} else {
			// Request user access token
			const options = {
				url: process.env.GET_TOKEN,
				json: true,
				body: {
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					code: userCode,
					grant_type: "authorization_code",
					redirect_uri: process.env.REDIRECT_URI,
				},
			};

			request.post(options, (err, res, body) => {
				if (err) {
					return console.log(err);
				}
				console.log("Status: " + res.statusCode);
				console.log(body);

				if (res.statusCode == 200) {
					resolve(res.body.access_token);
				} else {
					reject(res.statusCode);
				}
			});
		}
	});
};

const getTopTwitchGames = (accessToken) => {
	return new Promise((resolve, reject) => {
		const gameOptions = {
			url: process.env.GET_GAMES,
			method: "GET",
			headers: {
				"Client-ID": process.env.CLIENT_ID,
				Authorization: "Bearer " + accessToken,
			},
		};
		console.log("Calling Twitch Games API.");
		request.get(gameOptions, (err, res, body) => {
			if (err) {
				reject(err);
			} else {
				if (res.statusCode != 200) {
					console.log("Status: " + res.statusCode);
					reject(body);
				}
				console.log("Success");
				resolve(body);
			}
		});
	});
};

// Request Top game data from the Twitch API
exports.getTopGames = async (req, res) => {
	let AT = process.env.ACCESS_TOKEN || "";
	console.log("Access Token: " + process.env.GET_TOKEN);
	if (AT === "") {
		console.log("Getting token");
		await requestToken(process.env.GET_TOKEN)
			.then((res) => {
				console.log("In Resolved Promise");
				AT = res;
			})
			.catch((code) => {
				console.log("Failed with return code: " + code);
			});
	}

	// Get top games on twitch currently
	await getTopTwitchGames(AT)
		.then((message) => {
			console.log("In Resolve");
			res.json(message);
		})
		.catch((message) => {
			console.log("Rejected Promise: " + message);
			res.send("Error: " + message);
		});
};

const findChannel = (accessToken, user) => {
	console.log("User searching for: " + user);
	console.log(process.env.SEARCH_CHANNELS);
	console.log(process.env.SEARCH_CHANNELS + "?query=" + user);
	return new Promise((resolve, reject) => {
		const channelOptions = {
			url: process.env.SEARCH_CHANNELS + "?query=" + user,
			method: "GET",
			headers: {
				"Client-ID": process.env.CLIENT_ID,
				Authorization: "Bearer " + accessToken,
			},
		};
		console.log("Searching Users");
		request.get(channelOptions, (err, res, body) => {
			if (err) {
				reject(err);
			} else {
				if (res.statusCode != 200) {
					console.log("Status: " + res.statusCode);
					reject(body);
				}
				console.log("Success");
				resolve(body);
			}
		});
	});
};

exports.findChannels = async (req, res) => {
	let AT = process.env.ACCESS_TOKEN || "";
	console.log("Access Token: " + process.env.GET_TOKEN);
	if (AT === "") {
		console.log("Getting token");
		await requestToken(process.env.GET_TOKEN)
			.then((res) => {
				console.log("In Resolved Promise");
				AT = res;
			})
			.catch((code) => {
				console.log("Failed with return code: " + code);
			});
	}

	// Get requested user from Twitch API
	const requestedUser = req.query.user;
	console.log(requestedUser);
	await findChannel(AT, requestedUser)
		.then((message) => {
			console.log("Resolved");
			res.json(message);
		})
		.catch((message) => {
			console.log(message);
		});
};

exports.profileData = async (req, res) => {
	let UserToken = "";
	console.log(req.body.userCode);
	await requestToken(process.env.GET_TOKEN, req.body.userCode)
		.then((response) => {
			console.log("Success User Token Promise");
			console.log(response);
			UserToken = response;
		})
		.catch((message) => {
			console.log("In User Token catch");
			console.log(message);
		});
	const getUserOptions = {
		url: process.env.GET_USERS,
		method: "GET",
		headers: {
			"Client-ID": process.env.CLIENT_ID,
			Authorization: "Bearer " + UserToken,
		},
	};
	console.log("User Token: " + UserToken);
	request.get(getUserOptions, (err, response, body) => {
		if (err) {
			res.status(response.statusCode).send(body);
		} else {
			if (response.statusCode != 200) {
				console.log("Status: " + response.statusCode);
				console.log(JSON.parse(body));
        res.status(response.statusCode).send(body);
			} else {
				console.log("Success");
        const userTwitchObject = JSON.parse(body).data[0];
				console.log(userTwitchObject);
        res.status(response.statusCode).send(userTwitchObject);
			}
		}
	});
};
