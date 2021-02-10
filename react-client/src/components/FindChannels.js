import React, {useState, useEffect, useRef} from 'react';
import Button from './Button';
import Loader from './Loader';
import ChannelItem from './ChannelItem';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/esm/ModalDialog';

const FindChannels = (props) => {
  const [channelName, setChannelName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const channelArray = useRef([]);
  const channelList = useRef();
  const chosenChannel = useRef('');

  const queryChannels = () => {
    fetch('http://localhost:3001/findChannels?user=' + channelName).then(
      response => response.json()
    ).then( (jsondata) => {
      console.log(JSON.parse(jsondata));
      channelArray.current = JSON.parse(jsondata)['data'];
      setLoading(false);
    }
    ).catch((message) => {
      console.log(message);
    });
  }

  const setActiveChannel = (channelObject) => {
    chosenChannel.current = channelObject;
    setShowModal(true);
  }

  useEffect(() => {
    if (loading) {
      queryChannels(channelName);
    }
  }, [loading]);

  return (
    <>
      <div className='input-div'>
        <form>
          <input value={channelName} className="form-control form-control-lg" id='channelName' placeholder='Input Twitch Channel Name' onChange={e => setChannelName(e.target.value)}/>
        </form>
        <Button onClick={() => {setLoading(true)}} />
      </div>
      {(!loading && channelArray.current.length !== 0) ? 
      <div className='channel-container' ref={channelList}>
        {channelArray.current.map(channel => (
          <ChannelItem key={channel.display_name} 
          displayName={channel.display_name} 
          profileImg={channel.thumbnail_url}
          onClick={() => setActiveChannel(channel)}/>
        ))}
      </div> : <div></div>}
      <Modal show={showModal}>
        <Modal.Header closeButton onHide={() => setShowModal(false)}>
          <Modal.Header>
            <Modal.Title>{chosenChannel.current.display_name}</Modal.Title>
          </Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <p>Status: {chosenChannel.current.is_live ? 'Live' : 'Offline'}</p>
          <p>Title: {chosenChannel.current.title}</p>
          <a href={'https://www.twitch.tv/'+chosenChannel.current.display_name}>Visit the channel</a>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default FindChannels
