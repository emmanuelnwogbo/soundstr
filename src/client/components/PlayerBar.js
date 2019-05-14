import React, { Component } from 'react';

class PlayerBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  playSong = () => {
    this.props.playerBarStateController(this.props.currentArtist);
    //console.log(this.props);
    //console.log('inside songcard', this.state)
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

  render() {
    const { currentArtist } = this.props;
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
          <p className="playerbar--progressnumbers">0:00</p>
          <div className="playerbar--progressbar-parent">
            <span className="playerbar--progressbar-handle"></span>
            <div className="playerbar--progressbar">
              <div className="playerbar--progressbargrowth"></div>
            </div>
          </div>
          <p className="playerbar--progressnumbers">0:00</p>
        </div>

        <div className="playerbar--controls">
          <svg className="playerbar--controls-svg">
            <use xlinkHref="./sprite.svg#icon-shuffle1" />
          </svg>
          <svg className="playerbar--controls-svg">
            <use xlinkHref="./sprite.svg#icon-previous2" />
          </svg>
          <div className="playerbar--controls-playpausebackground">
            {this.renderPlayPauseBtn()}
          </div>
          <svg className="playerbar--controls-svg">
            <use xlinkHref="./sprite.svg#icon-next2" />
          </svg>
          <svg className="playerbar--controls-svg">
            <use xlinkHref="./sprite.svg#icon-loop1" />
          </svg>
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