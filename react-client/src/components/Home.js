import Header from './Header';
import React, {useState, useEffect, useRef} from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeCard from './HomeCard';
import Login from './Login';
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();
axios.defaults.withCredentials = true;

const Home = (props) => {
  const TopGamesCardBody = 'View the top 20 games currently being streamed on Twitch';
  const SearchChannelBody = 'Search for a Twitch Channel and view it\'s channel information and captures.'

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('code')) {
      axios.post('http://localhost:3001/setUserToken', {
        userToken: urlParams.get('code')
      }).then(message => {
        console.log(message);
      }).catch(e => {
      console.log("Post failed: " + e);
      });
    } else {
      console.log("No URL params");
    }
  }, []);


  return (
    <>
      <div className='home-img'></div>
      <div className='home-img-cover'></div>
      <div className='home-div'>
        <Header title={props.headerTitle}/>
        <Login />
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
