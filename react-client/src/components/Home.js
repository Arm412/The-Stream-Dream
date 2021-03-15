import Header from './Header';
import React, {useState, useEffect, useRef } from 'react';
import HomeCard from './HomeCard';
import Login from './Login';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout} from '../helpers/redux/actions/userLoggedActions';

axios.defaults.withCredentials = true;

const Home = (props) => {
  const loggedIn = useSelector(state => state.isLogged);
  const TopGamesCardBody = 'View the top 20 games currently being streamed on Twitch';
  const SearchChannelBody = 'Search for a Twitch Channel and view it\'s channel information and captures.'
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("LoggedIn: " + loggedIn);
    if (urlParams.get('code') && !loggedIn) {
      axios.post('http://localhost:3001/twitch/profileData', {
        userCode: urlParams.get('code'),
        withCredentials: true
      }).then(res => {
        localStorage.setItem('userTwitchName', res.data.display_name);
        localStorage.setItem('twitchUserImg', res.data.profile_image_url);
        if (!loggedIn) {
          dispatch(login());
        }
      }).catch(e => {
        console.log("Post failed: " + e);
      });
    } else {
      console.log("User is Logged In");
    }
  }, []);


  return (
    <>
      <div className='home-img'></div>
      <div className='home-img-cover'></div>
      <div className='home-div'>
        <div className='welcome-div'>
        {loggedIn ? <Header title={'Welcome, ' + localStorage.userTwitchName} /> : <Header title='Welcome!'/>}
        {!loggedIn ? <Login /> : <img alt={localStorage.userTwitchName} src={localStorage.twitchUserImg}></img>}
        </div>
        <div className='holder-div'>
          <div></div>
          <HomeCard 
          cardHeader='Search for Twitch Channel' 
          cardBody={SearchChannelBody}
          goToLink='/getUser'
          buttonText='Search Twitch Channels' />
          <HomeCard 
          cardHeader='View Top Twitch Games' 
          cardBody={TopGamesCardBody}
          goToLink='/getGames'
          buttonText='View Top Games' />
          <HomeCard 
          cardHeader='View Top Twitch Games' 
          cardBody={TopGamesCardBody}
          goToLink='/getGames'
          buttonText='View Top Games' />
        </div>
      </div>
    </>
  )
}

export default Home
