import React from 'react';

const ChannelItem = (props) => {
	return (
		<div className="channel-holder" onClick={props.onClick}>
			<div className="channel-img">
				<img
					className="search-img"
					src={props.profileImg}
					alt={props.displayName}
				/>
			</div>
			<div className="channel-name">
				<p className="center-text">{props.displayName}</p>
			</div>
		</div>
	);
};

export default ChannelItem;
