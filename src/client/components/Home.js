import React, { Component } from 'react';

import Container from './Container';

import artists from '../../db';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [...artists],
      currentArtist: artists[0],
      currentSong: null,
      nextArtist: null,
      nextArtist: artists[1],
      currentSongProgress: '0:00',
      currentSongDuration: '0:00',
      opacity: '0',
      PlayerBar: false
    }
  }

  componentDidMount() {
    const { window } = this.props;
    const { artists } = this.state;
    window.onload = () => {
      import('./PlayerBar').then(PlayerBar => {
        this.setState({
          PlayerBar: PlayerBar.default,
          opacity: '1'
        }, () => {
          console.log(this.state)
        })
      })
    }
  }

  render() {
    const { PlayerBar } = this.state;
    if (PlayerBar) {
      return (
        <div className="home" style={{opacity: this.state.opacity}}>
          <PlayerBar currentSongTime={{
            duration: this.state.currentSongDuration,
            progress: this.state.currentSongProgress
          }} 
          currentArtist={this.state.currentArtist}
          />
        </div>
      )
    }
    return <div />
  }
}

export default Home;