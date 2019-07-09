import React, { Component } from 'react';
import Audio from './Audio';

import '../scss/components/mobilesongcard.scss';

class MobileSongCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isIntersecting: false
    }
  }

  returnPlayPauseBtn = () => {
    if (this.props.songPlayingMobile && this.props.currentTrackMobile === `${this.props.track.id}${'123'}`) {
      return (
        <svg className={'mobilesongcard__controls--svg'} 
        onClick={() => this.props.setMobilePlayState(`${this.props.track.id}${'123'}`)}>
          <use xlinkHref="./sprite.svg#icon-pause"/>
        </svg>     
      )      
    }

    return (
      <svg className={'mobilesongcard__controls--svg'} onClick={() => this.props.setMobilePlayState(`${this.props.track.id}${'123'}`)}>
        <use xlinkHref="./sprite.svg#icon-play2"/>
      </svg>     
    )
  }

  renderContents = (track, overlay) => {
    if (!this.state.isIntersecting) {
      return;
    }

    if (this.state.isIntersecting) {
      return (
        <div className={'mobilesongcard__content'}>
          <figure>
            <span className={'mobilesongcard__overlay'} style={{
              background: `${overlay}`
            }}>
            </span>
            <img src={`${track.album.images[2].url}`}/>
          </figure>
          <div className={'mobilesongcard__controls'}>
            <div>{this.returnPlayPauseBtn()}</div>
            <div className={'mobilesongcard__controls--details'}>
              <h3>{track.name}</h3>
              <p>{track.artists[0].name}</p>
            </div>
          </div>
        </div>
      )
    }
  }

  componentDidMount() {
    const options = {};
    const observer = new IntersectionObserver((entries, observer) => {
      console.log(entries[0])
      console.log(entries[0].isIntersecting);
      if (entries[0].isIntersecting) {
        console.log('intersecting', this.props.track.id)
        this.setState({ isIntersecting: true })
      }

      if (!entries[0].isIntersecting) {
        this.setState({ isIntersecting: false })
      }
    }, options);

    observer.observe(document.getElementById(`${this.props.track.id}`))    
  }

  render() {
    if (this.props.track) {
      const { track, overlay } = this.props;
      return (
        <div className={'mobilesongcard'} id={`${track.id}`}>
          <Audio songSrc={track.preview_url} id={`${track.id}${'123'}`}/>
          {this.renderContents(track, overlay)}
        </div>
      )
    }
  }
}

export default MobileSongCard;