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
    //console.log(this.props);
    //console.log('inside songcard', this.state)
  }

  renderPlayPauseBtn = () => {
    if (this.state.artist !== null && this.state.artist.id === this.props.currentArtist.id && this.props.songPlaying) {
      return (
        <svg className="songcard--controls-svg" onClick={this.playSong}>
          <use xlinkHref="./sprite.svg#icon-pause" />
        </svg>
      )
    }
    else {
      return (
        <svg className="songcard--controls-svg" onClick={this.playSong}>
          <use xlinkHref="./sprite.svg#icon-play2" />
        </svg>
      )
    }
  }

  componentDidMount() {
    const { artist } = this.props
    this.setState({ artist })
  }

  render() {
    //console.log(this.props)
    return (
      <div className="songcard">
        <figure className="songcard--fig">
          <img className="songcard--img" src={this.props.artist.artist_albumart_link}/>
        </figure>
        <div className="songcard--controls">
          {this.renderPlayPauseBtn()}
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