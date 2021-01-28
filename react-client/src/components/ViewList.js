import { Component } from "react"
import React, {useState, useEffect, useRef} from 'react';

const ViewList = (props) => {

  return (
    <>
      <div className='twitch-list'>
        <div className='game-rank'>
          {props.gameData == null ? <div>No Source</div> : <h1>{props.rank}</h1> }
        </div>
        <div className='game-name'>
          {props.gameData == null ? <div>No Source</div> : <h1>{props.gameData.name}</h1> }
        </div>
        <div className='game-id'>
          {props.gameData == null ? <div>No Source</div> : <h1>{props.gameData.id}</h1> }
        </div>
        <div className='game-image'>
          {props.gameData == null ? <div>No Source</div> : <img src={props.gameData.box_art_url}/>}
        </div>
      </div>
    </>
  )
}

ViewList.defaultProps = {
  gameData: null,
}

export default ViewList
