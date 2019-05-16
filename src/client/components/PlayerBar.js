import React, { Component } from 'react';

class PlayerBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  playSong = () => {
    this.props.playerBarStateController(this.props.currentArtist);
  }

  playNextSong = () => {
    this.props.manuallyMoveToNextSong();
  }

  renderShuffleBtn = () => {
    if (this.props.shuffle) {
      return (
        <svg className="playerbar--controls-svg playerbar--controls-svg-colored" onClick={this.props.shuffleSong}>
          <use xlinkHref="./sprite.svg#icon-shuffle1" />
        </svg>
      )
    }

    return (
      <svg className="playerbar--controls-svg" onClick={this.props.shuffleSong}>
        <use xlinkHref="./sprite.svg#icon-shuffle1" />
      </svg>
    )
  }

  renderLoopBtn = () => {
    if (this.props.loop) {
      return (
        <svg className="playerbar--controls-svg  playerbar--controls-svg-colored" onClick={this.props.loopSong}>
          <use xlinkHref="./sprite.svg#icon-loop1" />
        </svg>
      )
    }

    return (
      <svg className="playerbar--controls-svg" onClick={this.props.loopSong}>
        <use xlinkHref="./sprite.svg#icon-loop1" />
      </svg>
    )
  }

  renderPlayPauseBtn = () => {
    if (this.props.songPlaying) {
      return (
        <svg className="playerbar--controls-svg playerbar--controls-svgplaypause" onClick={this.playSong}>
          <use xlinkHref="./sprite.svg#icon-pause" />
        </svg>
      )
    }
    return (
      <svg className="playerbar--controls-svg playerbar--controls-svgplaypause" onClick={this.playSong}>
        <use xlinkHref="./sprite.svg#icon-play2" />
      </svg>
    )
  }

  componentDidMount() {
    this.props.setPlayerProgressHandle();
  }

  render() {
    const { currentArtist, currentSongTime } = this.props;
    const { duration, progress } = currentSongTime;
    return (
      <div className="playerbar">
        <div className="playerbar--meta">
          <figure className="playerbar--figure" style={{
            backgroundImage: `url(${currentArtist.artist_albumart_link})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top'
          }}></figure>
          <div className="playerbar--details">
            <p className="playerbar--para-1">{currentArtist.artist_songname}</p>
            <p className="playerbar--para-2">{currentArtist.artist_name}</p>
          </div>
        </div>

        <div className="playerbar--progress">
          <p className="playerbar--progressnumbers">{progress}</p>
          <div id="playerbar--progressbar-parent" className="playerbar--progressbar-parent">
            <span id='playerbar--progressbar-handle' className="playerbar--progressbar-handle"></span>
            <div className="playerbar--progressbar">
              <div className="playerbar--progressbargrowth"></div>
            </div>
          </div>
          <p className="playerbar--progressnumbers">{duration}</p>
        </div>

        <div className="playerbar--controls">
          {this.renderShuffleBtn()}
          <svg className="playerbar--controls-svg" onClick={this.props.prevSong}>
            <use xlinkHref="./sprite.svg#icon-previous2" />
          </svg>
          <div className="playerbar--controls-playpausebackground">
            {this.renderPlayPauseBtn()}
          </div>
          <svg className="playerbar--controls-svg" onClick={this.playNextSong}>
            <use xlinkHref="./sprite.svg#icon-next2" />
          </svg>
          {this.renderLoopBtn()}
        </div>

        <div className="playerbar--volume">
          <svg className="playerbar--volume-svg">
            <use xlinkHref="./sprite.svg#icon-plus1" />
          </svg>
          <div className="playerbar--volume-progress-parent">
            <span className="playerbar--volume-handle"></span>
            <div className="playerbar--volume-progress">
              <div className="playerbar--volume-progressgrowth"></div>
            </div>
          </div>
          <svg className="playerbar--volume-svg">
            <use xlinkHref="./sprite.svg#icon-minus1" />
          </svg>
        </div>
      </div>
    )
  }
}


export default PlayerBar;