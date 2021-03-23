const request = require('request');

exports.requestToken = (userCode = '') => {
	return new Promise((resolve, reject) => {
		// Request Client access token
		if (userCode === '') {
			// Set API options
			const options = {
				url: process.env.GET_TOKEN,
				json: true,
				body: {
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					grant_type: 'client_credentials',
				},
			};

			request.post(options, (err, res, body) => {
				if (err) {
					return console.log(err);
				}
				console.log('Status: ' + res.statusCode);
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
					grant_type: 'authorization_code',
					redirect_uri: process.env.REDIRECT_URI,
				},
			};

			request.post(options, (err, res, body) => {
				if (err) {
					return console.log(err);
				}
				console.log('Status: ' + res.statusCode);
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

exports.findChannel = (accessToken, user) => {
	return new Promise((resolve, reject) => {
		const channelOptions = {
			url: process.env.SEARCH_CHANNELS + '?query=' + user,
			method: 'GET',
			headers: {
				'Client-ID': process.env.CLIENT_ID,
				Authorization: 'Bearer ' + accessToken,
			},
		};
		console.log(channelOptions);
		request.get(channelOptions, (err, res, body) => {
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

exports.getUserID = (loginName, accessToken) => {
	return new Promise((resolve, reject) => {
		const getUserOptions = {
			url: process.env.GET_USERS + '?login=' + loginName,
			method: 'GET',
			headers: {
				'Client-ID': process.env.CLIENT_ID,
				Authorization: 'Bearer ' + accessToken,
			},
		};

		request.get(getUserOptions, (err, res, body) => {
			if (err) {
				reject(err);
			} else {
				if (res.statusCode != 200) {
					console.log('Status: ' + res.statusCode);
					reject(body);
				}
				console.log('Success');
				const userObj = JSON.parse(body);
				resolve(userObj.data);
			}
		});
	});
};

exports.getGameID = (gameName, accessToken) => {
	return new Promise((resolve, reject) => {
		const getGameOptions = {
			url: process.env.GET_GAMES + '?name=' + gameName,
			method: 'GET',
			headers: {
				'Client-ID': process.env.CLIENT_ID,
				Authorization: 'Bearer ' + accessToken,
			},
		};
		request.get(getGameOptions, (err, res, body) => {
			if (err) {
				reject(err);
			} else {
				if (res.statusCode != 200) {
					console.log('Status: ' + res.statusCode);
					reject(body);
				}
				console.log('Success');
				const gameObj = JSON.parse(body);
				console.log(gameObj);
				resolve(gameObj.data);
			}
		});
	});
};

exports.getVideos = (identifier, searchBy, accessToken) => {
	return new Promise((resolve, reject) => {
		console.log('Looking for videos with ' + searchBy + ' id ' + identifier);
		const queryVar = searchBy === 'user' ? 'user_id' : 'game_id';
		console.log(process.env.GET_VIDEOS + '?' + queryVar + '=' + identifier);
		const getVideoObject = {
			url: process.env.GET_VIDEOS + '?' + queryVar + '=' + identifier,
			method: 'GET',
			headers: {
				'Client-ID': process.env.CLIENT_ID,
				Authorization: 'Bearer ' + accessToken,
			},
		};

		request.get(getVideoObject, (err, res, body) => {
			if (err) {
				reject(err);
			} else {
				if (res.statusCode != 200) {
					console.log('Status: ' + res.statusCode);
					reject(body);
				}
				console.log('Get Video Success');
				const gameObj = JSON.parse(body);
				console.log(gameObj);
				resolve(gameObj.data);
			}
		});
	});
};

exports.getClips = (identifier, searchBy, accessToken) => {
	return new Promise((resolve, reject) => {
		const queryVar = searchBy === 'user' ? 'broadcaster_id' : 'game_id';
		console.log(process.env.GET_CLIPS + '?' + queryVar + '=' + identifier);
		const getClipsObject = {
			url: process.env.GET_CLIPS + '?' + queryVar + '=' + identifier,
			method: 'GET',
			headers: {
				'Client-ID': process.env.CLIENT_ID,
				Authorization: 'Bearer ' + accessToken,
			},
		};
		request.get(getClipsObject, (err, res, body) => {
			if (err) {
				reject(err);
			} else {
				if (res.statusCode != 200) {
					console.log('Status: ' + res.statusCode);
					reject(body);
				}
				console.log('Get Video Success');
				const gameObj = JSON.parse(body);
				console.log(gameObj);
				resolve(gameObj.data);
			}
		});
	});
};
