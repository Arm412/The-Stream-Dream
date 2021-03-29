import Header from './Header';
import React, { useState, useEffect, useRef } from 'react';
import HomeCard from './HomeCard';
import LoginBtn from './LoginBtn';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../helpers/redux/actions/userLoggedActions';

axios.defaults.withCredentials = true;

const Home = (props) => {
	const loggedIn = useSelector((state) => state.isLogged);
	const TopGamesCardBody =
		'View the top 20 games currently being streamed on Twitch';
	const SearchChannelBody =
		"Search for a Twitch Channel and view it's channel information and captures.";
	const dispatch = useDispatch();

	useEffect(() => {
		// Ping the backend and establish new session if necessary
		axios
			.get('http://localhost:3001/', { withCredentials: true })
			.then((newUser) => {
				let newSession = newUser.data;
				if (newSession) {
					console.log(newSession);
					console.log('New session, loggin out');
					dispatch(logout());
					localStorage.clear();
				} else {
					console.log(newSession);
					console.log('Still logged In');
				}
			})
			.catch((err) => {
				console.log('Error connecting to server');
			});
	}, []);

	return (
		<>
			<div className="home-img"></div>
			<div className="home-img-cover"></div>
			<div className="home-div">
				<div className="welcome-div">
					{loggedIn ? (
						<Header title={'Welcome, ' + localStorage.userTwitchName} />
					) : (
						<Header title="Welcome!" />
					)}
					{!loggedIn ? (
						<LoginBtn />
					) : (
						<img
							alt={localStorage.userTwitchName}
							src={localStorage.twitchUserImg}
						></img>
					)}
				</div>
				<div className="holder-div">
					<HomeCard
						cardHeader="Search for Twitch Channel"
						cardBody={SearchChannelBody}
						goToLink="/getUser"
						buttonText="Search Twitch Channels"
					/>
					<HomeCard
						cardHeader="View Top Twitch Games"
						cardBody={TopGamesCardBody}
						goToLink="/getGames"
						buttonText="View Top Games"
					/>
					<HomeCard
						cardHeader="Search for Stream Clips"
						cardBody={TopGamesCardBody}
						goToLink="/getMedia"
						buttonText="Search for Twitch Videos/Clips"
					/>
				</div>
			</div>
		</>
	);
};

export default Home;
