import React from 'react';

const BasicBtn = (props) => {
	return (
		<div className={props.btnClass} id={props.id}>
			<button
				onClick={props.onClick}
				disabled={props.disabled}
				className="basic-btn text-color primary-bg"
			>
				{props.state === 'loading' ? (
					<div className="btn-loader"></div>
				) : (
					props.btnText
				)}
			</button>
		</div>
	);
};

export default BasicBtn;
