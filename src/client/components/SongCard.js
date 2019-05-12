import React, {  Component } from 'react';

class SongCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="songcard">
        <figure className="songcard--fig">
          <img className="songcard--img" src="https://res.cloudinary.com/dxlhzerlq/image/upload/v1545772378/Evergreen_Album_by_Broods_jimqqp.png"/>
        </figure>
        <div className="songcard--controls">
          <svg className="songcard--controls-svg">
            <use xlinkHref="./sprite.svg#icon-play2" />
          </svg>
        </div>
        <div className="songcard--details">
          <h3 className="songcard--details-h3">Song Name</h3>
          <p className="songcard--details-name">Name of Artist</p>
        </div>
      </div>
    )
  }
}

export default SongCard;