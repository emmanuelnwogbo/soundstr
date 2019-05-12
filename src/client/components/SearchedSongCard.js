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
      </div>
    )
  }
}

export default SearchedSongCard;