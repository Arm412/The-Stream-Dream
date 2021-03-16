import React, {useEffect} from 'react';
import Header from './Header';
import Loader from './Loader';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout} from '../helpers/redux/actions/userLoggedActions';
import axios from 'axios';

axios.defaults.withCredentials = true;

const LoggingInPage = () => {
  const loggedIn = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('In Logging screen');
    const urlParams = new URLSearchParams(window.location.search);
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
        window.location.replace("http://localhost:3000/");
      }).catch(e => {
        console.log("Post failed: " + e);
      });
    }
  }, [])
  return (
    <>
      <Header title='Logging in...' />
      <Loader />
    </>
  )
}

export default LoggingInPage
