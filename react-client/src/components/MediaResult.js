import React from 'react';

const MediaResult = (props) => {
	return (
		<>
			<result className={props.className} onClick={props.onclick}>
				<p className="result-column-title center-text">{props.title}</p>
			</result>
		</>
	);
};

export default MediaResult;
