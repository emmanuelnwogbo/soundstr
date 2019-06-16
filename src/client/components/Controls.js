import React, { Component } from 'react';
import Slider from './Slider';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: [
        `icon-shuffle1`,
        `icon-controller-jump-to-start`,
        `icon-play2`,
        `icon-pause`,
        `icon-controller-next`,
        `icon-loop1`,
        `icon-volume-medium`
      ]
    }
  }

  handleIconBtnActions = (e) => {
    const { 
      playSong, 
      pauseSong, 
      playNext, 
      playPrev,
      togglePauseState
    } = this.props;
    console.log(e.target.id);
    console.log(e.target.dataset.control)
    if (e.target.dataset.control === `icon-play2`) {
      togglePauseState()
      return playSong();
    }

    if (e.target.dataset.control === `icon-pause`) {
      togglePauseState()
      return pauseSong();
    }

    if (e.target.dataset.control === `icon-controller-next`) {
      return playNext();
    }

    if (e.target.dataset.control === `icon-controller-jump-to-start`) {
      return playPrev();
    }
  }

  returnAlbumArts = () => {
    //console.log(this.props.tracks, this.props.currentTrack)
    return this.props.tracks.map(track => {
      if (track.id) {
        if (track.artist_albumart_link || track.album.images) {
          const src = track.artist_albumart_link || track.album.images[2].url
          if (track.id === this.props.currentTrack) {
            return <img src={src} data-id={`${track.id}`} key={track.id} style={{
              zIndex: '30'
            }}/>
          }

          return <img src={src} data-id={`${track.id}`} key={track.id} style={{
            zIndex: '10'
          }}/>
        }
      }
    })
  }

  returnControlBtns = () => {
    const { controls } = this.state;
    return controls.map(control => {
      if (control === `icon-play2` || control === `icon-pause`) {
        return this.renderPlayPauseBtn(control);
      }
      return (
        <span id={control} key={control} style={{
          margin: `0 1.5rem`,
          cursor: 'pointer'
        }} onClick={this.handleIconBtnActions}>
          <svg className={`controls__middle__icons--svg`} data-control={`${control}`} style={{
            height: `2.5rem`,
            width: `2.5rem`,
            fill: `rgba(255, 255, 255,.6)`
          }}>
            <use xlinkHref={`./sprite.svg#${control}`} data-control={`${control}`}/>
          </svg>
        </span>
      )
    })
  }

  renderPlayPauseBtn = (control) => {
    const { songPlaying } = this.props;
    if (songPlaying && control === `icon-pause`) {
      return (
        <span id={control} key={control} style={{
          margin: `0 1.5rem`,
          cursor: 'pointer'
        }} onClick={this.handleIconBtnActions}>
          <svg className={`controls__middle__icons--svg`} data-control={`${control}`} style={{
            height: `3rem`,
            width: `3rem`,
            fill: `rgba(255, 255, 255,.6)`
          }}>
            <use xlinkHref={`./sprite.svg#${control}`} data-control={`${control}`}/>
          </svg>
        </span>
      )  
    }

    if (!songPlaying && control === `icon-play2`) {
      return (
        <span id={control} key={control} style={{
          margin: `0 1.5rem`,
          cursor: 'pointer'
        }} onClick={this.handleIconBtnActions}>
          <svg className={`controls__middle__icons--svg`} data-control={`${control}`} style={{
            height: `3rem`,
            width: `3rem`,
            fill: `rgba(255, 255, 255,.6)`
          }}>
            <use xlinkHref={`./sprite.svg#${control}`} data-control={`${control}`}/>
          </svg>
        </span>
      )  
    }    
  }

  returnNames = () => {
    const { tracks } = this.props;
    console.log(tracks)
    return tracks.map(track => {
      if (track.id) {
        if (track.artist_albumart_link || track.album.images) {
          if (track.id === this.props.currentTrack) {
            return (
              <div className={`controls__first__names`} key={track.id}>
                <span>{track.artists ? track.name : track.artist_songname}</span>
                <span>{track.artists ? track.artists[0].name : track.artist_name}</span>
              </div>              
            )
          }
        }
      }
    })
  }

  render() {
    return (
      <div className={`controls`}>
        <div className={`controls__first`}>
          <figure>
          {this.returnAlbumArts()}
          </figure>
          {this.returnNames()}
        </div>
        <div className={`controls__middle`} style={{
          display: 'flex',
          marginLeft: `3rem`,
          flexDirection: 'column',
          justifyContent: `center`,
          alignItems: `center`,
          width: `50%`
        }}>
          <div className={`controls__middle__icons`} style={{
            marginBottom: `1.5rem`
          }}>
            {this.returnControlBtns()}
          </div>
          <div className={`controls__middle__progress`} style={{
            width: `100%`
          }}>
            <Slider/>
          </div>
        </div>

      </div>
    )
  }
}

export default Controls;