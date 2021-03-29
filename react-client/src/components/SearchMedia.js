import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import axios from 'axios';
import SelectForm from './SelectForm';
import MediaResult from './MediaResult';
import BasicBtn from './BasicBtn';

axios.defaults.withCredentials = true;

const SearchMedia = (props) => {
	const [identifier, setIdentifier] = useState('');
	const [mediaOption, setMediaOption] = useState('videos');
	const [searchBy, setSearchBy] = useState('game');
	const [mediaState, setMediaState] = useState('input');
	const inputElement = useRef();
	const mediaArray = useRef();

	// Query the media from the twitch api by posting to the /twitch/getMedia endpoint
	const queryTwitch = (mediaOption, searchBy, identifier) => {
		return new Promise((resolve, reject) => {
			axios
				.post('http://localhost:3001/twitch/getMedia', {
					id: identifier,
					mediaOption: mediaOption,
					searchBy: searchBy,
				})
				.then((returnData) => {
					if (returnData.data.notFound) {
						inputElement.current.style.backgroundColor = '#c06572';
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
		// Call query function and update the state based on the returned info
		if (mediaState === 'loading') {
			inputElement.current.style.backgroundColor = 'white';
			queryTwitch(mediaOption, searchBy, identifier)
				.then((data) => {
					mediaData = data;
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
				{mediaState === 'input' || mediaState === 'loading' ? (
					<div>
						<Header title="Search for Clips and Videos!" />
						<div className="media-form-container flex-div">
							<SelectForm
								formClass="media-select-form"
								headerText="Select type of media"
								setFunction={setMediaOption}
								parentVariable={mediaOption}
								selectOptions={['Videos', 'Clips']}
							/>
							<SelectForm
								formClass="media-select-form"
								headerText={'Search the ' + mediaOption + ' by'}
								setFunction={setSearchBy}
								parentVariable={searchBy}
								selectOptions={['Game', 'User']}
							/>
							<form className="media-input-form">
								<h2 className="center-text">Input name of the {searchBy}</h2>
								<input
									value={identifier}
									className="form-control form-control-lg media-input"
									ref={inputElement}
									placeholder={'Input ' + searchBy}
									onChange={(e) => setIdentifier(e.target.value)}
								/>
							</form>
						</div>
					</div>
				) : (
					<div>
						<Header
							title={
								(mediaOption === 'videos' ? 'Video' : 'Clip') +
								' results for ' +
								identifier
							}
						/>
						<div className="media-data-loaded-div">
							<MediaResult
								className="media-header"
								streamer="Broadcaster"
								title="Title"
								views="Views"
							/>
							<div className="media-results-div">
								{mediaOption === 'videos'
									? mediaArray.current.map((media) => (
											<MediaResult
												className="media-clip-result"
												mediaLink={media.url}
												streamer={media.user_name}
												title={media.title}
												views={media.view_count}
												key={media.id}
											/>
									  ))
									: mediaArray.current.map((media) => (
											<MediaResult
												className="media-clip-result"
												mediaLink={media.url}
												streamer={media.broadcaster_name}
												title={media.title}
												views={media.view_count}
												key={media.id}
											/>
									  ))}
							</div>
						</div>
					</div>
				)}
				{mediaState === 'input' || mediaState === 'loading' ? (
					<BasicBtn
						onClick={() => {
							setMediaState('loading');
						}}
						disabled={identifier === ''}
						btnText="Search"
						btnClass="media-btn-div"
					/>
				) : (
					<BasicBtn
						onClick={() => {
							setMediaState('input');
						}}
						disabled={false}
						btnText="Back to search"
						btnClass="media-btn-div"
					/>
				)}
			</div>
		</div>
	);
};

export default SearchMedia;
