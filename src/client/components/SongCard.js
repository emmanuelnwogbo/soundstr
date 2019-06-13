import React, { Component } from 'react';
import Audio from './Audio';

class SongCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songCardId: null
    }
  }

  openTrack = () => {
    const { track } = this.props;
    const win = window.open(track.external_urls.spotify, '_blank');
    win.focus();
  }

  returnFeedBack = () => {
    if (this.props.songPlaying && 
      this.props.currentTrack === this.state.songCardId && 
      this.props.playBackState === 'playing') {
      return (
        <div className={`songcard__playingfeedback`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )
    }

    if (!this.props.songPlaying || this.props.playBackState === 'ended') {
      return (
        <div>
        </div>
      )
    }
  }

  returnPlayPauseBtn = (id) => {
    const { playPause } = this.props;

    if (this.props.songPlaying && 
      this.props.currentTrack === this.state.songCardId && 
      this.props.playBackState === 'waiting') {
        return (
          <svg className={`songcard__controls--svg ${id} pause`} style={{
            animation: `spinThree 1s linear 1s infinite`,
            fill: 'rgba(214, 48, 49,1.0)',
            opacity: '1'
          }} data-songmatch={id} onClick={playPause}>
            <use xlinkHref="./sprite.svg#icon-spinner9" data-songmatch={id} className={`${id} pause`}/>
          </svg>
        )        
    }

    if (this.props.songPlaying && this.props.currentTrack === this.state.songCardId) {
      return (
        <svg className={`songcard__controls--svg ${id} pause`} data-songmatch={id} onClick={playPause}>
          <use xlinkHref="./sprite.svg#icon-pause" data-songmatch={id} className={`${id} pause`}/>
        </svg>
      )
    }

    
    return (
      <svg className={`songcard__controls--svg ${id} play`} data-songmatch={id} onClick={playPause}>
        <use xlinkHref="./sprite.svg#icon-play2" data-songmatch={id} className={`${id} play`}/>
      </svg>
    )
  }

  componentDidMount() {
    const { track, artist } = this.props;
    if (track !== undefined) {
      return this.setState({ songCardId: track.id })
    }
    
    if (artist !== undefined) {
      return this.setState({ songCardId: artist.id })
    }
  }

  render() {
    if (this.props.track) {
      const { track, overlay } = this.props;
      return (
        <div className={`songcard`}>
          <Audio songSrc={track.preview_url} id={track.id}/>
          <figure>
            <div className={`songcard__controls`}>
              {this.returnPlayPauseBtn(track.id)}
              <span onClick={this.openTrack}>play on spotify</span>
            </div>
            {this.returnFeedBack()}
            <span className={`songcard--overlay`} style={{
              background: `${overlay}`
            }}></span>
            <img src={`${track.album.images[2].url}`}/>
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
        <Audio songSrc={artist.artist_songlink} id={artist.id}/>
        <figure>
          <div className={`songcard__controls`}>
            {this.returnPlayPauseBtn(artist.id)}
          </div>
          {this.returnFeedBack()}                   
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