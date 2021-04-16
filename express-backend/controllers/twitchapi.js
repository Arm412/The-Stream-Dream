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

exports.checkSession = async (req, res) => {
	console.log('Ping');
	if (!req.session.visited) {
		console.log('New Session');
		req.session.visited = true;
		res.send(true);
	} else {
		console.log('Old Session');
		res.send(false);
	}
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
	if (req.query['user'].includes(';') || req.query['user'].includes('*')) {
		res.sendStatus(500);
	} else {
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
				res.status(500);
			});
	}
};

exports.getMedia = async (req, res) => {
	if (req.body['id'].includes(';') || req.body['id'].includes('*')) {
		res.sendStatus(500);
	} else {
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
	}
};
