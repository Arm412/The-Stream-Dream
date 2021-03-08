import React from 'react';

const ProfileDiv = (props) => {
  return (
    <div className='static-login-div'>
      <img alt={localStorage.userTwitchName} src={localStorage.twitchUserImg}></img>
    </div>
  )
}

export default ProfileDiv
