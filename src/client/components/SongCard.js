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
      </div>
    )
  }
}

export default SongCard;