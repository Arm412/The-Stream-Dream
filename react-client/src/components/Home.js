import Header from './Header';
import Button from './Button';
import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {

  return (
    <>
      <Header title={props.headerTitle}/>
      <div className='btnContainer'>
        <Button btnName='Find Twitch User' />
        <Link to='/getGames'>
          <Button btnName='View Top Twitch Games'/>
        </Link>
      </div>
    </>
  )
}

export default Home
