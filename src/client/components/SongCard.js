import React, {  Component } from 'react';

class SongCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: null
    }
  }

  playSong = () => {
    this.props.playerBarStateController(this.state.artist);
    console.log(this.props);
  }

  componentDidMount() {
    const { artist } = this.props
    this.setState({ artist })
  }

  render() {
    return (
      <div className="songcard">
        <figure className="songcard--fig">
          <img className="songcard--img" src={this.props.artist.artist_albumart_link}/>
        </figure>
        <div className="songcard--controls">
          <svg className="songcard--controls-svg" onClick={this.playSong}>
            <use xlinkHref="./sprite.svg#icon-play2" />
          </svg>
        </div>
        <div className="songcard--details">
          <h3 className="songcard--details-h3">{this.props.artist.artist_songname}</h3>
          <p className="songcard--details-name">{this.props.artist.artist_name}</p>
        </div>
      </div>
    )
  }
}

export default SongCard;