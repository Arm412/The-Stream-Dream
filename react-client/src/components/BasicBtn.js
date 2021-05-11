import React from 'react';

const BasicBtn = (props) => {
	return (
		<div className={props.btnClass}>
			<button
				id={props.id}
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
