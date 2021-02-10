import React from 'react';

const ChannelItem = (props) => {
  return (
    <div className='channel-holder' onClick={props.onClick}>
      <div>
        <img className='search-img' src={props.profileImg} alt={props.displayName}/>
      </div>
      <div>
        <p className='center-text'>{props.displayName}</p>
      </div>
    </div>
  )
}

export default ChannelItem
