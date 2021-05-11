import Header from './Header';
import React from 'react';
import HomeCard from './HomeCard';
import axios from 'axios';
//import { useSelector, useDispatch } from 'react-redux';

axios.defaults.withCredentials = true;

const Home = (props) => {
	//const loggedIn = useSelector((state) => state.isLogged);
	const TopGamesCardBody =
		'View the top 20 games currently being streamed on Twitch';
	const SearchChannelBody =
		"Search for a Twitch Channel and view it's channel information and captures.";
	const SearchMediaBody =
		'Search for Clips and Videos for a specific game or twitch channel broadcaster.';
	//const dispatch = useDispatch();

	return (
		<>
			<div className="home-img"></div>
			<div className="container-overlay"></div>
			<div className="home-div">
				<div className="welcome-div">
					<Header title="Welcome to The Stream Dream!" />
				</div>
				<div className="holder-div">
					<HomeCard
						cardHeader="Search for Twitch Channel"
						cardBody={SearchChannelBody}
						goToLink="/getUser"
						buttonText="Search Twitch Channels"
						BtnId="getUserBtn"
					/>
					<HomeCard
						cardHeader="View Top Twitch Games"
						cardBody={TopGamesCardBody}
						goToLink="/getGames"
						buttonText="View Top Games"
						BtnId="topGamesBtn"
					/>
					<HomeCard
						cardHeader="Search for Stream Clips"
						cardBody={SearchMediaBody}
						goToLink="/getMedia"
						buttonText="Search for Twitch Videos/Clips"
						BtnId="getMediaBtn"
					/>
				</div>
			</div>
		</>
	);
};

export default Home;
