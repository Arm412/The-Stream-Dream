import React from 'react';
import { Link } from 'react-router-dom';

const HomeCard = (props) => {
  return (
    <>
      <div className='card-flex'>
        <div className='card-header-div'>
        <h3>{props.cardHeader}</h3>
        </div>
        <div className='card-body-div'>
          <p>&emsp; {props.cardBody}</p>
        </div>
        <div className='card-header-btn'>
          <Link to={props.goToLink} className='home-btn'>
            <div className='btn-div'>
              <span>{props.buttonText}</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomeCard
