import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import ChannelItem from './ChannelItem';
import Modal from 'react-bootstrap/Modal';
import Languages from '../helpers/languages.json';
import axios from 'axios';

const FindChannels = (props) => {
	const [channelName, setChannelName] = useState('');
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const channelArray = useRef([]);
	const channelList = useRef();
	const chosenChannel = useRef('');
	const invalid = useRef(false);

	const queryChannels = () => {
		// Call the find channel backend api endpoint to query the twitch API
		axios
			.get('/twitch/findChannels?user=' + channelName, {
				withCredentials: true,
			})
			.then((jsondata) => {
				channelArray.current = JSON.parse(jsondata.data).data;
				setLoading(false);
			})
			.catch((message) => {
				if (process.env.REACT_APP_BUILD_ENV === 'DEBUG') {
					console.log(message);
				}
				invalid.current = true;
				setLoading(false);
			});
	};

	// Update state for the selected channel
	const setActiveChannel = (channelObject) => {
		chosenChannel.current = channelObject;
		setShowModal(true);
	};

	useEffect(() => {
		if (document.body.clientWidth < 1200) {
			if (
				document
					.getElementById('marginDiv')
					.classList.contains('sm-margin-container')
			) {
				document
					.getElementById('marginDiv')
					.classList.remove('sm-margin-container');
				document
					.getElementById('marginDiv')
					.classList.add('auto-margin-container');
			} else {
				if (
					document
						.getElementById('marginDiv')
						.classList.contains('auto-margin-container')
				) {
					document
						.getElementById('marginDiv')
						.classList.remove('auto-margin-container');
					document
						.getElementById('marginDiv')
						.classList.add('sm-margin-container');
				}
			}
		}
	}, []);

	useEffect(() => {
		if (loading) {
			queryChannels(channelName);
		}

		if (!loading && channelArray.current.length !== 0) {
			// Add flex class
			if (
				document
					.getElementById('channelResultFlex')
					.classList.contains('no-width')
			) {
				document
					.getElementById('channelResultFlex')
					.classList.remove('no-width');
				document
					.getElementById('channelResultFlex')
					.classList.add('show-channel');
			}
		}
	}, [loading]);

	return (
		<div className="find-channel-container">
			<div className="container-overlay"></div>
			<div className="pop-out">
				<Header title="Find a Twitch Channel" />
				<p className="center-text white-border dark-bg margin-text">
					Search for Twitch streamers who have actively been streaming. Users
					who have not streamed within the past 6 months will not be found.
				</p>
				<div id="marginDiv" className="sm-margin-container">
					<div className="channel-container flex-container flex-wrap">
						<form className="media-input-form flex-box-1 flex-animate-item">
							<h2 className="center-text">Input the name of the channel</h2>
							<input
								value={channelName}
								className="form-control form-control-lg media-input"
								id="channelName"
								placeholder="Input Twitch Channel"
								onChange={(e) => setChannelName(e.target.value)}
							/>
							{invalid.current === true ? (
								<p className="red center-text">Invalid Input</p>
							) : null}
						</form>
						{!loading && channelArray.current.length !== 0 ? (
							<div
								id="channelResultFlex"
								className="flex-animate-item no-width flex-box-1"
							>
								<div className="channel-result-div" ref={channelList}>
									{channelArray.current.map((channel) => (
										<ChannelItem
											key={channel.display_name}
											displayName={channel.display_name}
											profileImg={channel.thumbnail_url}
											onClick={() => setActiveChannel(channel)}
										/>
									))}
								</div>
							</div>
						) : null}
					</div>
					<button
						className="find-channel-btn text-color primary-bg"
						onClick={() => {
							invalid.current = false;
							setLoading(true);
						}}
						disabled={channelName === ''}
					>
						{!loading ? 'Search' : <div className="btn-loader"></div>}
					</button>
				</div>
				<Modal show={showModal}>
					<Modal.Header closeButton onHide={() => setShowModal(false)}>
						<Modal.Header className="channel-modal modal-header">
							<Modal.Title>{chosenChannel.current.display_name}</Modal.Title>
						</Modal.Header>
					</Modal.Header>
					<Modal.Body className="channel-modal">
						<div className="modal-channel-body">
							<p className="text-color">
								Status: {chosenChannel.current.is_live ? 'Live' : 'Offline'}
							</p>
							<p className="text-color">Title: {chosenChannel.current.title}</p>
							<p className="text-color">
								Language:{' '}
								{Languages[chosenChannel.current.broadcaster_language]}
							</p>
						</div>

						<a
							className="text-link"
							href={
								'https://www.twitch.tv/' + chosenChannel.current.display_name
							}
						>
							<button className="primary-bg text-color">
								Visit the channel
							</button>
						</a>
					</Modal.Body>
				</Modal>
			</div>
		</div>
	);
};

export default FindChannels;
