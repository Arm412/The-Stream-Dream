const request = require('request');

exports.requestToken = () => {
	return new Promise((resolve, reject) => {
		// Request Client access token
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

			if (res.statusCode == 200) {
				resolve(res.body.access_token);
			} else {
				reject(res.statusCode);
			}
		});

		request.post(options, (err, res, body) => {
			if (err) {
				return console.log(err);
			}

			if (res.statusCode == 200) {
				resolve(res.body.access_token);
			} else {
				reject(res.statusCode);
			}
		});
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
		request.get(channelOptions, (err, res, body) => {
			if (err) {
				reject(err);
			} else {
				if (res.statusCode != 200) {
					reject(body);
				}
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
					reject(body);
				}
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
					reject(body);
				}
				const gameObj = JSON.parse(body);
				//console.log(gameObj);
				resolve(gameObj.data);
			}
		});
	});
};

exports.getVideos = (identifier, searchBy, accessToken) => {
	return new Promise((resolve, reject) => {
		let pages = [[]];
		const queryVar = searchBy === 'user' ? 'user_id' : 'game_id';
		let url =
			process.env.GET_VIDEOS + '?' + queryVar + '=' + identifier + '&first=99';

		const getVideoObject = {
			url: url,
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
					reject(body);
				}
				const gameObj = JSON.parse(body);
				//console.log(gameObj);
				pages = setPagesArray(gameObj.data, pages);
				resolve(pages);
			}
		});
	});
};

exports.getClips = (identifier, searchBy, accessToken) => {
	return new Promise((resolve, reject) => {
		let pages = [[]];
		const queryVar = searchBy === 'user' ? 'broadcaster_id' : 'game_id';
		let url =
			process.env.GET_CLIPS + '?' + queryVar + '=' + identifier + '&first=99';
		const getClipsObject = {
			url: url,
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
					reject(body);
				}
				const gameObj = JSON.parse(body);
				//console.log(gameObj);
				pages = setPagesArray(gameObj.data, pages);
				resolve(pages);
			}
		});
	});
};

const setPagesArray = (items, pageArray) => {
	const PAGE_LENGTH = 11;
	let lastPage = pageArray.length - 1;
	// Start from the first object in new items
	for (let i = 0; i < items.length; i++) {
		// Check if new page needs created before inserting the item
		if (pageArray[lastPage].length === PAGE_LENGTH) {
			lastPage += 1;
			pageArray.push([]);
		}

		// Start inserting at the next available slot in a page
		pageArray[lastPage].push(items[i]);
	}
	return pageArray;
};
