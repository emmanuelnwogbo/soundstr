import React, { Component } from 'react';

import Utils from '../../helpers/Utils';
const { convertSeconds } = Utils;

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 10,
      currentTime: 0,
      currentTimeDisplay: '0:00',
      durationDisplay: '0:00',
      currentTrack: null,
      transparentProgress: null,
      transparentProgressWidth: null,
      playPercent: '0'
    };
    window.onresize = () => {
      this.setState({
        transparentProgress: document.getElementById('progress-transparent')
      }, () => {
        this.setState(prevState => {
          return {
            transparentProgressWidth: prevState.transparentProgress.offsetWidth
          }
        })
      })
    }
  }

  setCurrentSongTimeUpdateEvent = (nextProps) => {
    if (nextProps.currentTrack !== this.state.currentTrack || this.props.songPlaying) {
      this.setState({ currentTrack: this.props.currentTrack }, () => {
        if (document.getElementById(this.state.currentTrack) !== null) {
          document.getElementById(this.state.currentTrack).addEventListener('timeupdate', () => {
            const { currentTime, duration } = document.getElementById(this.state.currentTrack);
            this.setState({
               currentTime, 
               duration,
               currentTimeDisplay: `${convertSeconds(Math.floor(currentTime))}`,
               durationDisplay: `${convertSeconds(Math.floor(duration))}`,
               playPercent: `${this.state.transparentProgressWidth * (currentTime / duration)}`
            })
          })
        }
      });
    }
  }

  changeValue = (e) => {
    const { value } = e.target;
    this.setState({ currentTime: value }, () => {
      document.getElementById(this.state.currentTrack).currentTime = this.state.currentTime;
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setCurrentSongTimeUpdateEvent(nextProps);
  }

  componentDidMount() {
    this.setState({
      transparentProgress: document.getElementById('progress-transparent')
    }, () => {
      this.setState(prevState => {
        return {
          transparentProgressWidth: prevState.transparentProgress.offsetWidth
        }
      })
    })
  }

  render() {
    const { duration } = this.state;
    return (
      <div style={{
        width: '100%',
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
      }} className={`controls__slider`}>
        <span style={{
          display: 'inline-block',
          margin: '0 1rem'
        }}>{this.state.currentTimeDisplay}</span>
        <div style={{
          position: 'relative',
          width: '100%'
        }} className={`controls__slider--content`}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: `${this.state.playPercent}px`,
            height: '100%',
            borderRadius: '3rem',
            cursor: 'pointer',
            zIndex: '10',
            background: '#d63031'
          }} className={`controls__slider--progress`}></div>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            borderRadius: '3rem',
            cursor: 'pointer',
            zIndex: '9',
            background: 'rgba(255, 255, 255,.4)',
            transition:  'all .1s ease-in-out'
          }} className={`controls__slider--progresstransparent`} id={'progress-transparent'}></div>
          <input
          min='0'
          max={`${duration}`} 
          value={`${this.state.currentTime}`} 
          type='range'
          onChange={this.changeValue}
          style={{
            position: 'relative',
            zIndex: '12'
          }} className={`controls__slider--input`}></input>
        </div>
        <span style={{
          display: 'inline-block',
          margin: '0 1rem'
        }}>{this.state.durationDisplay}</span>
      </div>
    )
  }
}

export default Slider;