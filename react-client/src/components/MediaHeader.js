import React from 'react';

const MediaHeader = (props) => {
	return (
		<div className="media-header header-color" onClick={props.onclick}>
			<p className="result-column-name center-text">{props.streamer}</p>
			<p className="result-column-title center-text">{props.title}</p>
			<p className="result-column-views center-text">{props.views}</p>
		</div>
	);
};

export default MediaHeader;
