import { Component } from "react"
import React, {useState, useEffect, useRef} from 'react';

const ViewList = (props) => {

  return (
    <>
      <div className='twitch-list'>
        <div className='game-image'>
          {props.gameData == null ? <div>No Source</div> : <img src={props.gameData.box_art_url}/>}
        </div>
        <div className='game-info'>
          <div >
            {props.gameData == null ? <div>No Source</div> : <p>{props.rank}</p> }
          </div>
          <div >
            {props.gameData == null ? <div>No Source</div> : <p>{props.gameData.name}</p> }
          </div>
          <div>
            {props.gameData == null ? <div>No Source</div> : <p>{props.gameData.id}</p> }
          </div>
        </div>
      </div>
    </>
  )
}

ViewList.defaultProps = {
  gameData: null,
}

export default ViewList
