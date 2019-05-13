import React, { Component } from 'react';

import Container from './Container';
import PlayerBar from './PlayerBar';

import artists from '../../db'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioComponent: null,
      artists: artists,
      currentArtist: artists[0]
    }
  }

  playerBarStateController = (currentArtist) => {
      //import('./Audio').then(Audio => console.log(<Audio.default />))
    import('./Audio').then(
      Audio => this.setState({
         audioComponent: Audio.default,
         currentArtist
        }, () => {
          console.log(document.getElementById(this.state.currentArtist.id))
          document.getElementById(this.state.currentArtist.id).play();
        }));
  }

  renderAudioTags = () => {
    if (this.state.audioComponent !== null) {
      return this.state.artists.map(artist => {
        return <this.state.audioComponent song={artist.artist_songlink} id={artist.id}/>
      })
    }
    return;
  }

  render() {
    return (
      <div className="home">
        {this.renderAudioTags()}
        <Container playerBarStateController={this.playerBarStateController} artists={this.state.artists}/>
        <PlayerBar currentArtist={this.state.currentArtist}/>
      </div>
    )
  }
}

export default Home;