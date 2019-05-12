import React, { Component } from 'react';

class PlayerBar extends Component {
  constructor() {
    super();
    this.style = {
      backgroundImage: 'url(https://res.cloudinary.com/dxlhzerlq/image/upload/q_100/v1545772572/images_zjglmv.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'top'
    }
  }

  render() {
    return (
      <div className="playerbar">
        <div className="playerbar--meta">
          <figure className="playerbar--figure" style={this.style}></figure>
          <div className="playerbar--details">
            <p className="playerbar--para-1">{'nameofSong'}</p>
            <p className="playerbar--para-2">{'name of Artist'}</p>
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
            <svg className="playerbar--controls-svg playerbar--controls-svgplaypause">
              <use xlinkHref="./sprite.svg#icon-play2" />
            </svg>
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