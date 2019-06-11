import React, { Component } from 'react';
import '../scss/components/songcard.scss';

class SongCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  openTrack = () => {
    const { track } = this.props;
    const win = window.open(track.external_urls.spotify, '_blank');
    win.focus();
  }

  render() {
    if (this.props.track) {
      const { track, overlay } = this.props;
      return (
        <div className={`songcard`}>
          <figure>
            <div className={`songcard__controls`}>
              <svg className={`songcard__controls--svg`}>
                <use xlinkHref="./sprite.svg#icon-play2" />
              </svg>
              <span onClick={this.openTrack}>play on spotify</span>
            </div>
            <span className={`songcard--overlay`} style={{
              background: `${overlay}`
            }}></span>
            <img src={`${track.album.images[0].url}`}/>
          </figure>
          <div className={`songcard__details`}>
            <h3 className={`songcard__details--h3`}>{track.name}</h3>
            <p className={`songcard__details--name`}>{track.artists[0].name}</p>
          </div>
        </div>
      )
    }
    const { artist, overlay } = this.props;
    return (
      <div className={`songcard`}>
        <figure>
          <div className={`songcard__controls`}>
            <svg className={`songcard__controls--svg`}>
              <use xlinkHref="./sprite.svg#icon-play2" />
            </svg>
          </div>
          <span className={`songcard--overlay`} style={{
            background: `${overlay}`
          }}></span>
          <img src={`${artist.artist_albumart_link}`}/>
        </figure>
        <div className={`songcard__details`}>
          <h3 className={`songcard__details--h3`}>{artist.artist_songname}</h3>
          <p className={`songcard__details--name`}>{artist.artist_name}</p>
        </div>
      </div>
    )
  }
}

export default SongCard;