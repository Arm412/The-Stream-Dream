import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import axios from 'axios';
import SelectForm from './SelectForm';
import ClipResult from './ClipResult';

axios.defaults.withCredentials = true;

const SearchMedia = (props) => {
	const [identifier, setIdentifier] = useState('');
	const [mediaOption, setMediaOption] = useState('videos');
	const [searchBy, setSearchBy] = useState('game');
	const [mediaState, setMediaState] = useState('input');
	const inputElement = useRef();
	const mediaArray = useRef();

	useEffect(() => {
		console.log(mediaOption);
	}, [mediaOption]);

	const queryTwitch = (mediaOption, searchBy, identifier) => {
		return new Promise((resolve, reject) => {
			axios
				.post('http://localhost:3001/twitch/getMedia', {
					id: identifier,
					mediaOption: mediaOption,
					searchBy: searchBy,
				})
				.then((returnData) => {
					console.log('Returned data');
					console.log(returnData);
					if (returnData.data.notFound) {
						//inputElement.current.style.backgroundColor = '#c06572';
						reject('No data found for ' + searchBy);
					} else {
						resolve(returnData.data);
					}
				})
				.catch((message) => {
					reject(message);
				});
		});
	};

	useEffect(() => {
		let mediaData;
		if (mediaState === 'loading') {
			inputElement.current.style.backgroundColor = 'white';
			queryTwitch(mediaOption, searchBy, identifier)
				.then((data) => {
					console.log('Exit');
					mediaData = data;
					console.log(mediaData);
					mediaArray.current = mediaData;
					if (mediaArray.current.length === 0) {
						console.log('User found but no media was returned');
						// show no media text
						setMediaState('input');
					} else {
						console.log('Updating media state to display');
						setMediaState('display');
					}
				})
				.catch((err) => {
					console.log(err);
					setMediaState('input');
				});
		}
	}, [mediaState]);

	return (
		<div className="find-media-container">
			<div className="container-overlay"></div>
			<div className="pop-out">
				<Header title="Search for Clips and Videos!" />
				{mediaState === 'input' || mediaState === 'loading' ? (
					<div className="media-form-container flex-div">
						<SelectForm
							formClass="media-form"
							headerText="Select type of media"
							setFunction={setMediaOption}
							parentVariable={mediaOption}
							selectOptions={['Videos', 'Clips']}
						/>
						<SelectForm
							formClass="media-form"
							headerText={'Search the ' + mediaOption + ' by'}
							setFunction={setSearchBy}
							parentVariable={searchBy}
							selectOptions={['Game', 'User']}
						/>
						<form className="media-form">
							<h2 className="center-text">Input name of the {searchBy}</h2>
							<input
								value={identifier}
								className="form-control form-control-lg"
								ref={inputElement}
								placeholder={'Input ' + searchBy}
								onChange={(e) => setIdentifier(e.target.value)}
							/>
						</form>
					</div>
				) : (
					<div className="media-results-div">
						<ClipResult />
					</div>
				)}
				{mediaState === 'input' || mediaState === 'loading' ? (
					<button
						className="find-media-btn"
						onClick={() => {
							setMediaState('loading');
						}}
						disabled={identifier === ''}
					>
						Search
					</button>
				) : (
					<button
						onClick={() => {
							setMediaState('input');
						}}
					>
						Back to search
					</button>
				)}
			</div>
		</div>
	);
};

export default SearchMedia;
