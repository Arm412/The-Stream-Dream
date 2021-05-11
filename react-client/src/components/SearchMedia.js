import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import axios from 'axios';
import SelectForm from './SelectForm';
import MediaResult from './MediaResult';
import BasicBtn from './BasicBtn';
import MediaInfo from './MediaInfo';
import PageArrows from './PageArrows';

axios.defaults.withCredentials = true;

const SearchMedia = (props) => {
	const [identifier, setIdentifier] = useState('');
	const [mediaOption, setMediaOption] = useState('videos');
	const [searchBy, setSearchBy] = useState('game');
	const [mediaState, setMediaState] = useState('input');
	const [showActive, setShowActive] = useState('');
	const [page, setPage] = useState(0);
	const inputElement = useRef();
	const mediaArray = useRef();
	const noData = useRef(false);
	const doesntExist = useRef(false);
	const activeMedia = useRef();

	// Update all of the game img urls to include a height and width
	const updateImages = (thumbnailURL) => {
		// Return empty string if no url is specified
		if (thumbnailURL === '') {
			return '';
		}

		// Update the img size
		if (thumbnailURL.indexOf('%{width') > 0) {
			let cutoff = thumbnailURL.indexOf('%{width');
			thumbnailURL = thumbnailURL.substring(0, cutoff) + '720x1280.jpg';
			return thumbnailURL;
		} else {
			// Return if this url has already updated its size
			return thumbnailURL;
		}
	};

	// Query the media from the twitch api by posting to the /twitch/getMedia endpoint
	const queryTwitch = (mediaOption, searchBy, identifier) => {
		return new Promise((resolve, reject) => {
			axios
				.post('/twitch/getMedia', {
					id: identifier,
					mediaOption: mediaOption,
					searchBy: searchBy,
				})
				.then((returnData) => {
					if (returnData.data.notFound) {
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
		if (inputElement.current) {
			inputElement.current.style.backgroundColor = 'white';
		}
	}, [mediaOption, searchBy]);

	useEffect(() => {
		let mediaData;
		noData.current = false;
		doesntExist.current = false;
		// Call query function and update the state based on the returned info
		if (mediaState === 'loading') {
			doesntExist.current = false;
			noData.current = false;
			queryTwitch(mediaOption, searchBy, identifier)
				.then((data) => {
					mediaData = data;

					mediaArray.current = mediaData;

					if (process.env.REACT_APP_BUILD_ENV === 'DEBUG') {
						console.log(mediaData);
					}

					if (mediaArray.current[page].length === 0) {
						console.log('User found but no media was returned');
						noData.current = true;
						// show no media text
						setMediaState('input');
					} else {
						setMediaState('display');
					}
				})
				.catch((err) => {
					console.log(err);
					doesntExist.current = true;
					inputElement.current.style.backgroundColor = '#c06572';
					setMediaState('input');
				});
		}

		// Hide the media data container when in different state
		if (showActive !== '' && mediaState !== 'display') {
			setShowActive('');
		}

		if (mediaState === 'input') {
			setPage(0);
		}
	}, [mediaState]);

	useEffect(() => {
		noData.current = false;
		if (document.getElementById('mediaSearchBtn')) {
			if (identifier === '') {
				document
					.getElementById('mediaSearchBtn')
					.classList.add('restrict-click');
			} else {
				if (
					document
						.getElementById('mediaSearchBtn')
						.classList.contains('restrict-click')
				) {
					document
						.getElementById('mediaSearchBtn')
						.classList.remove('restrict-click');
				}
			}
		}
	}, [identifier]);

	return (
		<div className="find-media-container">
			<div className="container-overlay"></div>
			<div className="pop-out">
				{mediaState === 'input' || mediaState === 'loading' ? (
					<Header title="Search for Clips and Videos!" />
				) : (
					<Header
						title={
							(mediaOption === 'videos' ? 'Video' : 'Clip') +
							' results for ' +
							identifier
						}
					/>
				)}
				<div className="auto-margin-container">
					{mediaState === 'input' || mediaState === 'loading' ? (
						<>
							<div>
								<p className="center-text white-border dark-bg margin-text">
									Every Twitch streamer has the ability to save their streams
									publicly on their profile for others to view. They can archive
									their entire stream, or they can save shorter videos. Viewers
									also have the ability to save short clips from the stream
									which is also saved on the channel. On this page, a user can
									enter in a streamer and view their clips and videos! The user
									can also search for clips/videos based on a specific game.
								</p>
							</div>
							<div className="media-form-container flex-container">
								<SelectForm
									formClass="media-select-form flex-box-1"
									headerText="Select type of media"
									setFunction={setMediaOption}
									parentVariable={mediaOption}
									selectOptions={['Videos', 'Clips']}
									selectorId="mediaOption"
								/>
								<SelectForm
									formClass="media-select-form flex-box-1"
									headerText={'Filter the ' + mediaOption + ' by'}
									setFunction={setSearchBy}
									parentVariable={searchBy}
									selectOptions={['Game', 'User']}
									selectorId="searchBy"
								/>
								<form className="media-input-form flex-box-1">
									<h2 className="center-text">
										Input the name of the {searchBy}
									</h2>
									<input
										value={identifier}
										className="form-control form-control-lg media-input"
										ref={inputElement}
										placeholder={'Input ' + searchBy}
										onChange={(e) => {
											inputElement.current.style.backgroundColor = 'white';
											setIdentifier(e.target.value);
										}}
										id="mediaUserInput"
									/>
									{noData.current ? (
										<p id="noMediaText" className="center-text caution">
											This {searchBy} has no {mediaOption}
										</p>
									) : null}
									{doesntExist.current ? (
										<p id="invalidText" className="center-text red">
											This {searchBy} does not exist
										</p>
									) : null}
								</form>
							</div>
						</>
					) : (
						<>
							<div className="flex-container flex-wrap auto-margin no-overflow">
								<div
									id="mediaResultContainer"
									className="media-data-wrapper flex-animate-item flex-box-1"
								>
									<div className="media-data-loaded-div">
										<MediaResult
											className="media-header"
											streamer="Broadcaster"
											title="Title"
											views="Views"
										/>
										<div className="media-results-div">
											{mediaOption === 'videos'
												? mediaArray.current[page].map((media) => (
														<MediaResult
															onclick={() => {
																media['thumbnail_url'] = updateImages(
																	media['thumbnail_url']
																);
																activeMedia.current = media;
																setShowActive(media['id']);
															}}
															className="media-clip-result"
															mediaLink={media.url}
															streamer={media.user_name}
															title={media.title}
															views={media.view_count}
															key={media.id}
														/>
												  ))
												: mediaArray.current[page].map((media) => (
														<MediaResult
															onclick={() => {
																activeMedia.current = media;
																setShowActive(media['id']);
															}}
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
									{mediaArray.current[page + 1] === undefined &&
									page === 0 ? null : (
										<PageArrows
											pageNum={page}
											previousPage={() => {
												setPage(page - 1);
											}}
											nextPage={() => {
												setPage(page + 1);
											}}
											hasNextPage={mediaArray.current[page + 1] !== undefined}
										/>
									)}
								</div>
								{showActive ? (
									<MediaInfo
										media={activeMedia.current}
										mediaType={mediaOption}
									/>
								) : null}
							</div>
						</>
					)}
					{mediaState === 'input' || mediaState === 'loading' ? (
						<BasicBtn
							onClick={() => {
								setMediaState('loading');
							}}
							disabled={identifier === ''}
							btnText="Search"
							btnClass="media-btn-div"
							id="mediaSearchBtn"
							state={mediaState}
						/>
					) : (
						<BasicBtn
							onClick={() => {
								setMediaState('input');
							}}
							disabled={false}
							btnText="Back to search"
							btnClass="media-btn-div"
							id="mediaSearchBtn"
							state={mediaState}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchMedia;
