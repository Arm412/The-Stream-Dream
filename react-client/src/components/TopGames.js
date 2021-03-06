import React, { useState, useEffect, useRef } from 'react';
import Loader from './Loader';
import ViewList from './ViewList';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import Header from './Header';

const TopGames = (props) => {
	const [dataLoaded, setDataLoaded] = useState(false);
	const Games = useRef([]);
	let rank = 0;

	useEffect(() => {
		// Call Get Top Games function and handle state change based on response
		getTopGames()
			.then((twitchData) => {
				const parsedData = JSON.parse(twitchData.data);
				Games.current = updateArray(parsedData.data);
				setDataLoaded(true);
			})
			.catch((message) => {
				console.log(message);
			});
	}, []);

	const getTopGames = async () => {
		// Call the backend to query the Top Games API
		return new Promise((resolve, reject) => {
			axios
				.get('/twitch/getGames', {
					withCredentials: true,
				})
				.then((response) => {
					resolve(response);
				})
				.then((jsondata) => resolve(jsondata))
				.catch((message) => {
					reject(message);
				});
		});
	};

	// handle obtaining the box art url of games and calling the update function
	const updateArray = (gameArray) => {
		let arr = [];
		const dataArr = gameArray;
		const updateImgSrc = updateSrcImages(dataArr);
		const length = Object.keys(dataArr).length;
		for (let i = 0; i < length; i++) {
			gameArray[i]['box_art_url'] = updateImgSrc[i];
			// Put games into array for mapping
			arr.push(gameArray[i]);
		}
		return arr;
	};

	// Update all of the game img urls to include a height and width
	const updateSrcImages = (twitchJson) => {
		let imgSrcStrings = [];
		const length = Object.keys(twitchJson).length;
		for (let i = 0; i < length; i++) {
			let artURL = twitchJson[i]['box_art_url'];
			let cutoff = artURL.indexOf('{width');
			artURL = artURL.substring(0, cutoff) + '140x180.jpg';
			imgSrcStrings.push(artURL);
		}
		return imgSrcStrings;
	};

	return (
		<div className="top-games-container">
			<div className="container-overlay"></div>
			<Header title={props.headerTitle} />
			{!dataLoaded ? <Loader></Loader> : null}
			<div className="carousel-wrapper pop-out" hidden={!dataLoaded}>
				{dataLoaded ? (
					<Carousel>
						{Games.current.map((game) => (
							<Carousel.Item className="text-info">
								<ViewList rank={++rank} gameData={game}></ViewList>
							</Carousel.Item>
						))}
					</Carousel>
				) : null}
			</div>
		</div>
	);
};

export default TopGames;
