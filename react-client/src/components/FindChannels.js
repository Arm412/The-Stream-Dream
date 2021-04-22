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
		if (loading) {
			queryChannels(channelName);
		}
	}, [loading]);

	return (
		<div className="find-channel-container">
			<div className="container-overlay"></div>
			<div className="pop-out">
				<Header title="Find a Twitch Channel" />
				<div className="input-div pop-out">
					<form>
						<input
							value={channelName}
							className="form-control form-control-lg"
							id="channelName"
							placeholder="Input Twitch Channel Name"
							onChange={(e) => setChannelName(e.target.value)}
						/>
					</form>
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
					{invalid.current === true ? (
						<p className="red">Invalid Input</p>
					) : null}
				</div>
				{!loading && channelArray.current.length !== 0 ? (
					<div className="channel-container" ref={channelList}>
						{channelArray.current.map((channel) => (
							<ChannelItem
								key={channel.display_name}
								displayName={channel.display_name}
								profileImg={channel.thumbnail_url}
								onClick={() => setActiveChannel(channel)}
							/>
						))}
					</div>
				) : (
					<div></div>
				)}
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
