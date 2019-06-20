import React, {  Component } from 'react';

import '../scss/components/songcard.scss';

class SongCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: null
    }
  }

  playSong = () => {
    this.props.playerBarStateController(this.state.artist);
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

  renderPlayingFeedBack = () => {
    if (this.state.artist !== null && this.state.artist.id === this.props.currentArtist.id && this.props.songPlaying) {
      return (
        <div className="songcard--playbackfeedback">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )
    }
    return;
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
          {this.renderPlayPauseBtn()}
        </div>
        <div className="songcard--details">
          <h3 className="songcard--details-h3">{this.props.artist.artist_songname}</h3>
          <p className="songcard--details-name">{this.props.artist.artist_name}</p>
        </div>
        {this.renderPlayingFeedBack()}
      </div>
    )
  }
}

export default SongCard;


const { currentTrack, playBackState } = this.state;
    const currentSong = document.getElementById(currentTrack);

    if (currentSong.parentElement.nextSibling !== null) {
      if (currentSong.parentElement.nextSibling.classList.contains('controls')) {
        if (playBackState !== 'ended') {
          return;
        }
        return this.setState({
          currentTrack: Array.from(document.getElementsByTagName('audio'))[0].id
        })
      }

      if (currentSong.parentElement.nextElementSibling.classList.contains('container__recommended__header')) {
        const nextSongCard = currentSong.parentElement.nextElementSibling.nextElementSibling;
        this.stopSong();
        this.handleNextPrevStateTransition(nextSongCard)
      }

      if (currentSong.parentElement.nextSibling.classList.contains('songcard')) {
        const nextSongCard = currentSong.parentElement.nextSibling;
        this.stopSong();
        this.handleNextPrevStateTransition(nextSongCard)
      }
    }

    const { currentTrack} = this.state;
    const currentSong = document.getElementById(currentTrack);
    
    if (currentSong.parentElement.previousSibling !== null) {
      if (currentSong.parentElement.previousSibling.classList.contains('container__board')) {
        return;
      }

      if (currentSong.parentElement.previousSibling.classList.contains('container__recommended__header')) {
        const prevSongCard = currentSong.parentElement.previousSibling.previousSibling;
        this.stopSong();
        this.handleNextPrevStateTransition(prevSongCard)
      }

      if (currentSong.parentElement.previousSibling.classList.contains('songcard')) {
        const prevSongCard = currentSong.parentElement.previousSibling;
        this.stopSong();
        this.handleNextPrevStateTransition(prevSongCard)
      }
    }