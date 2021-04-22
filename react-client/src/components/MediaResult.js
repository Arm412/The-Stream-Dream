import React from 'react';

const MediaResult = (props) => {
	return (
		<>
			<div className={props.className} onClick={props.onclick}>
				<p className="result-column-title center-text">{props.title}</p>
			</div>
		</>
	);
};

export default MediaResult;
