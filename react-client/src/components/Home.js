import Header from './Header';
import Button from './Button';
import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {

  return (
    <>
      <Header title={props.headerTitle}/>
      <div className='btnContainer'>
        <Link to='/getUser'>
          <Button btnName='Search for Twitch Channel' />
        </Link>
        <Link to='/getGames'>
          <Button btnName='View Top Twitch Games'/>
        </Link>
      </div>
    </>
  )
}

export default Home
