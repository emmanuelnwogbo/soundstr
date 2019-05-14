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
      currentArtist: artists[0],
      songPlaying: false
    }
  }

  playerBarStateController = (currentArtist) => {
    if (this.state.currentArtist !== currentArtist) {
      return this.setState({ 
        currentArtist,
        songPlaying: true
      });
    }

    if (this.state.songPlaying) {
      return this.setState({ songPlaying: false })
    }

    if (!this.state.songPlaying) {
      return this.setState({ songPlaying: true })
    }
  }

  renderAudioTags = () => {
    if (this.state.audioComponent !== null) {
      return this.state.artists.map(artist => {
        return <this.state.audioComponent song={artist.artist_songlink} id={artist.id}/>
      })
    }
    return;
  }

  componentDidMount() {
    /*this.props.window.onload = () => {
      console.log(this);
      import('./Audio').then(
        Audio => this.setState({
          audioComponent: Audio.default
        })
      )
    }*/
  }

  render() {
    return (
      <div className="home">
        {this.renderAudioTags()}
        <Container songPlaying={this.state.songPlaying} currentArtist={this.state.currentArtist} playerBarStateController={this.playerBarStateController} artists={this.state.artists}/>
        <PlayerBar songPlaying={this.state.songPlaying} currentArtist={this.state.currentArtist} playerBarStateController={this.playerBarStateController}/>
      </div>
    )
  }
}

export default Home;