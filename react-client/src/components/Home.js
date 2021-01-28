import Header from './Header';
import Button from './Button';
import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  const [buttonsHidden, setButtonsHidden] = useState(false);
  const [viewTopGames, setViewTopGames] = useState(false);
  const btnDivRef = useRef();

  useEffect(() => {
    console.log();
  }, [])

  const getTopGames = async () => {
    return new Promise ((resolve, reject) => {
      console.log("In GetGames");
      fetch('http://localhost:3001/getGames').then(
        response => response.json()
      ).then(
        jsondata => console.log(jsondata),
        setViewTopGames(true)
      );
    });
  };


  return (
    <>
      <Header title={props.headerTitle}/>
      <div ref={btnDivRef} className='btnContainer'>
        <Button btnName='Find Twitch User' />
        <Link to='/getGames'>
          <Button btnName='View Top Twitch Games'/>
        </Link>
      </div>
    </>
  )
}

export default Home
