import React, {useState, useEffect, useRef} from 'react';
import Button from './Button';

const FindChannels = (props) => {
  const [channelName, setChannelName] = useState('');

  useEffect(() => {
    console.log("In getUser");
    fetch('http://localhost:3001/findChannels?user=TacoBang');
  }, []);

  useEffect(() => {
    console.log(channelName);
  }, [channelName]);

  const getChannelInput = () => {
    setChannelName(document.getElementById('channelName').value);
  }

  const queryChannels = () => {
    return new Promise ((resolve, reject) => {
      console.log("Querying Twitch API for " + channelName);
      console.log('http://localhost:3001/findChannels?user=' + channelName);
      fetch('http://localhost:3001/findChannels?user=' + channelName).then(
        response => response.json()
      ).then(
        jsondata => resolve(jsondata)
      ).catch((message) => {
        reject(message);
      });
    });
  }

  return (
    <>
      <div className='input-div'>
        <form>
          <input className="form-control form-control-lg" id='channelName' placeholder='Input Twitch Channel Name' onChange={getChannelInput}/>
        </form>
      </div>
    </>
  )
}

export default FindChannels
