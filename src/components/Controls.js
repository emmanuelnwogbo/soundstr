import React, { Component } from 'react';
import Slider from './Slider';

import '../scss/components/controls.scss';

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
      ],
      loopBtnColor: `rgba(255, 255, 255,.6)`,
      shuffleBtnColor: `rgba(255, 255, 255,.6)`
    }
  }

  handleIconBtnActions = (e) => {
    const { 
      playSong, 
      pauseSong, 
      playNextManually, 
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
      return playNextManually();
    }

    if (e.target.dataset.control === `icon-controller-jump-to-start`) {
      return playPrev();
    }

    if (e.target.dataset.control === `icon-loop1`) {
      return this.props.handleLoop();
    }

    if (e.target.dataset.control === `icon-shuffle1`) {
      return this.props.toggleShuffle();
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
        return (
          <span id={control} key={control} style={{
            margin: `0 1.5rem`,
            cursor: 'pointer',
            display: 'none'
          }} onClick={this.handleIconBtnActions} id={`${control}`}>
            <svg className={`controls__middle__icons--svg`} data-control={`${control}`} style={{
              height: `3rem`,
              width: `3rem`,
              fill: `#d63031`
            }}>
              <use xlinkHref={`./sprite.svg#${control}`} data-control={`${control}`}/>
            </svg>
          </span>
        ) 
      }

      if (control === `icon-loop1`) {
        return (
          <span id={control} key={control} style={{
            margin: `0 1.5rem`,
            cursor: 'pointer'
          }} onClick={this.handleIconBtnActions}>
            <svg className={`controls__middle__icons--svg`} data-control={`${control}`} style={{
              height: `2.5rem`,
              width: `2.5rem`,
              fill: this.state.loopBtnColor
            }} id={`${control}`}>
              <use xlinkHref={`./sprite.svg#${control}`} data-control={`${control}`}/>
            </svg>
          </span>
        )
      }

      if (control === `icon-shuffle1`) {
        return (
          <span id={control} key={control} style={{
            margin: `0 1.5rem`,
            cursor: 'pointer'
          }} onClick={this.handleIconBtnActions}>
            <svg className={`controls__middle__icons--svg`} data-control={`${control}`} style={{
              height: `2.5rem`,
              width: `2.5rem`,
              fill: this.state.shuffleBtnColor
            }} id={`${control}`}>
              <use xlinkHref={`./sprite.svg#${control}`} data-control={`${control}`}/>
            </svg>
          </span>
        )      
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
          }} id={`${control}`}>
            <use xlinkHref={`./sprite.svg#${control}`} data-control={`${control}`}/>
          </svg>
        </span>
      )
    })
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

  renderPlayPauseBtn = (nextProps) => {
    if (nextProps.songPlaying) {
      document.getElementById('icon-play2').style.display = 'none';
      document.getElementById('icon-pause').style.display = 'inline-block';
    }
    
    if (!nextProps.songPlaying) {
      document.getElementById('icon-play2').style.display = 'inline-block';
      document.getElementById('icon-pause').style.display = 'none';
    }
  }

  renderLoopBtn = (nextProps) => {
    if (nextProps.loop) {
      return this.setState({
        loopBtnColor: '#d63031'
      });
    }

    return this.setState({
      loopBtnColor: 'rgba(255, 255, 255,.6)'
    });
  }

  renderShuffleBtn = (nextProps) => {
    if (nextProps.shuffle) {
      return this.setState({
        shuffleBtnColor: '#d63031'
      });
    }

    return this.setState({
      shuffleBtnColor: 'rgba(255, 255, 255,.6)'
    });
  }

  componentDidMount() {
    document.getElementById('icon-play2').style.display = 'inline-block';
  }

  componentWillReceiveProps(nextProps) {
    this.renderPlayPauseBtn(nextProps);
    this.renderLoopBtn(nextProps);
    this.renderShuffleBtn(nextProps)
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
            <Slider 
            currentTrack={this.props.currentTrack}
            songPlaying={this.props.songPlaying}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Controls;