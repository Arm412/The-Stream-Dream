import React, { useState, useEffect, useRef } from 'react';
import BasicBtn from './BasicBtn';

const MediaInfo = (props) => {
	return (
		<div className="media-details flex-container flex-box-1">
			{props.media['thumbnail_url'] === '' ? (
				<div className="no-thumbnail"></div>
			) : (
				<div className="info-thumbnail-clip">
					<img
						alt={props.media['thumbnail_url']}
						src={props.media['thumbnail_url']}
						className="info-img-div"
					></img>
				</div>
			)}

			<section className="info-desc-div">
				<div className="flex-container desc-height">
					<p className="header-color">Title: &nbsp; </p>
					<p className="desc-text">{props.media['title']}</p>
				</div>
				<div className="flex-container desc-height">
					<p className="header-color">Description: &nbsp; </p>
					<p className="desc-text">
						{props.media['description'] !== ''
							? props.media['description']
							: 'No description provided'}
					</p>
				</div>
				<div className="flex-container">
					<p className="header-color">Twitch User: &nbsp; </p>
					<p className="center-text white">{props.media['user_name']}</p>
				</div>
				<div className="flex-container desc-height">
					<p className="header-color">Views: &nbsp; </p>
					<p className="center-text white">{props.media['view_count']}</p>
					<p className="header-color">&nbsp; Duration: &nbsp; </p>
					<p className="center-text white">{props.media['duration']}</p>
				</div>

				<BasicBtn
					btnClass="info-link-div"
					btnText="View"
					onClick={() => {
						window.open(props.media['url'], '_blank');
					}}
				/>
			</section>
		</div>
	);
};

export default MediaInfo;
