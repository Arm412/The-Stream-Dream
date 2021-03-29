require('dotenv').config({ path: '../.env' });
const e = require('express');
const request = require('request');
const Helpers = require('./Helpers/HelperFunctions');

const getTopTwitchGames = (accessToken) => {
	return new Promise((resolve, reject) => {
		const gameOptions = {
			url: process.env.GET_TOP_GAMES,
			method: 'GET',
			headers: {
				'Client-ID': process.env.CLIENT_ID,
				Authorization: 'Bearer ' + accessToken,
			},
		};
		request.get(gameOptions, (err, res, body) => {
			if (err) {
				reject(err);
			} else {
				if (res.statusCode != 200) {
					console.log('Status: ' + res.statusCode);
					reject(body);
				}
				console.log('Success');
				resolve(body);
			}
		});
	});
};

// Request Top game data from the Twitch API
exports.getTopGames = async (req, res) => {
	let AT = '';
	if (!req.session.accessToken) {
		await Helpers.requestToken()
			.then((accessToken) => {
				req.session.accessToken = accessToken;
				AT = accessToken;
			})
			.catch((code) => {
				console.log('Failed with return code: ' + code);
			});
	} else {
		AT = req.session.accessToken;
	}
	// Get top games on twitch currently
	await getTopTwitchGames(AT)
		.then((message) => {
			res.json(message);
		})
		.catch((message) => {
			res.send('Error: ' + message);
		});
};

exports.findChannels = async (req, res) => {
	let AT = '';
	if (!req.session.accessToken) {
		await Helpers.requestToken()
			.then((accessToken) => {
				req.session.accessToken = accessToken;
				AT = accessToken;
			})
			.catch((code) => {
				console.log('Failed with return code: ' + code);
			});
	} else {
		AT = req.session.accessToken;
	}

	// Get requested user from Twitch API
	const requestedUser = req.query.user;
	await Helpers.findChannel(AT, requestedUser)
		.then((message) => {
			res.json(message);
		})
		.catch((message) => {
			console.log(message);
		});
};

exports.profileData = async (req, res) => {
	let UserToken = '';
	if (!req.session.userToken) {
		await Helpers.requestToken(req.body.userCode)
			.then((response) => {
				req.session.userToken = response;
				UserToken = response;
			})
			.catch((message) => {
				console.log(message);
			});
	} else {
		UserToken = req.session.userToken;
	}
	const getUserOptions = {
		url: process.env.GET_USERS,
		method: 'GET',
		headers: {
			'Client-ID': process.env.CLIENT_ID,
			Authorization: 'Bearer ' + UserToken,
		},
	};
	request.get(getUserOptions, (err, response, body) => {
		if (err) {
			res.status(response.statusCode).send(body);
		} else {
			if (response.statusCode != 200) {
				console.log('Status: ' + response.statusCode);
				res.status(response.statusCode).send(body);
			} else {
				const userTwitchObject = JSON.parse(body).data[0];
				res.status(response.statusCode).send(userTwitchObject);
			}
		}
	});
};

exports.getMedia = async (req, res) => {
	let AT = '';
	if (!req.session.accessToken) {
		await Helpers.requestToken()
			.then((accessToken) => {
				req.session.accessToken = accessToken;
				AT = accessToken;
			})
			.catch((code) => {
				console.log('Failed with return code: ' + code);
			});
	} else {
		AT = req.session.accessToken;
	}

	if (req.body.searchBy === 'user') {
		Helpers.getUserID(req.body.id, AT)
			.then((userObject) => {
				console.log(userObject);

				// No user_id was found with the given login
				if (userObject.length === 0) {
					const returnObj = {
						notFound: true,
						data: 'Unable to find user with given login.',
					};
					res.send(returnObj);
				} else {
					if (req.body.mediaOption === 'videos') {
						return Helpers.getVideos(userObject[0].id, req.body.searchBy, AT);
					} else {
						return Helpers.getClips(userObject[0].id, req.body.searchBy, AT);
					}
				}
			})
			.then((ret) => {
				res.send(ret);
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		Helpers.getGameID(req.body.id, AT)
			.then((gameObject) => {
				if (gameObject.length === 0) {
					const returnObj = {
						notFound: true,
						data: 'Unable to find game with given name.',
					};
					res.send(returnObj);
				} else {
					if (req.body.mediaOption === 'videos') {
						return Helpers.getVideos(gameObject[0].id, req.body.searchBy, AT);
					} else {
						return Helpers.getClips(gameObject[0].id, req.body.searchBy, AT);
					}
				}
			})
			.then((ret) => {
				res.send(ret);
			})
			.catch((err) => {
				console.log(err);
			});
	}
};
