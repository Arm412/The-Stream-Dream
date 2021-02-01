import React, {useState, useEffect, useRef} from 'react';
import Loader from './Loader';
import ViewList from './ViewList';
import Carousel from 'react-bootstrap/Carousel';

const TopGames = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  let topGamesJSON = useRef(null);
  let Games = useRef([]);
  let rank = 0;

  useEffect(() => {
    getTopGames().then((twitchData) => {
      console.log('Fetch Resolved...');
      topGamesJSON.current = JSON.parse(twitchData);
      Games.current = updateArray(topGamesJSON.current.data);
      setDataLoaded(true);
    }).catch((message) => {
      console.log(message)
    });
  }, []);

  const getTopGames = async () => {
    return new Promise ((resolve, reject) => {
      fetch('http://localhost:3001/getGames').then(
        response => response.json()
      ).then(
        jsondata => resolve(jsondata)
      ).catch((message) => {
        reject(message);
      });
    });
  };

  const updateArray = (gameArray) => {
    let arr = [];
    const dataArr = gameArray;
    const updateImgSrc = updateSrcImages(dataArr);
    const length = Object.keys(dataArr).length;
    for (let i = 0 ; i < length ; i++) {
      gameArray[i]['box_art_url'] = updateImgSrc[i];
      // Put games into array for mapping
      arr.push(gameArray[i]);
    }
    return arr;
  }

  const updateSrcImages = (twitchJson) => {
    let imgSrcStrings = [];
    const length = Object.keys(twitchJson).length;
    for (let i = 0 ; i < length ; i++) {
      let artURL = twitchJson[i]['box_art_url'];
      let cutoff = artURL.indexOf("{width");
      artURL = artURL.substring(0, cutoff) + '140x180.jpg';
      imgSrcStrings.push(artURL);
    }
    return imgSrcStrings;
  }

  return (
    <div className='carousel-wrapper'>
      {!dataLoaded ? <Loader></Loader> : null}
      {dataLoaded ? 
        <Carousel>
          {Games.current.map(game => (
            <Carousel.Item className='text-info'>
              <ViewList rank={++rank} gameData={game}></ViewList>
            </Carousel.Item>
          ))}
        </Carousel>
        : null
          }
    </div>
  )
}

export default TopGames
