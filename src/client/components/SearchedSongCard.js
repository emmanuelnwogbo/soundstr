import React, {  Component } from 'react';

class SearchedSongCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.style = {
      backgroundImage: 'url(https://res.cloudinary.com/dxlhzerlq/image/upload/q_100/v1545772572/images_zjglmv.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'top'
    }
  }

  render() {
    return (
      <div className="songcard">
        <figure className="songcard--fig" style={this.style}>
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

export default SearchedSongCard;