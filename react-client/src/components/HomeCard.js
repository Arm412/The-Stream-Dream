import React from 'react';
import { Link } from 'react-router-dom';

const HomeCard = (props) => {
	return (
		<>
			<div className="card-flex">
				<div className="card-header-div">
					<h3>{props.cardHeader}</h3>
				</div>
				<div className="card-body-div text-color">
					<p>{props.cardBody}</p>
				</div>
				<div className="card-header-btn">
					<Link to={props.goToLink}>
						<div className="btn-div primary-bg text-color">
							<span>{props.buttonText}</span>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default HomeCard;
