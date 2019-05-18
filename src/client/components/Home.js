import React, { Component } from 'react';

import Container from './Container';

import artists from '../../db';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AudioComponent: false,
      artists: [...artists],
      currentArtist: artists[0],
      currentSong: null,
      nextArtist: null,
      nextSong: null,
      currentSongProgress: '0:00',
      currentSongDuration: '0:00',
      opacity: '0',
      PlayerBar: false,
      songPlaying: false,
      playSong: null,
      shuffle: false,
      loaded: false
    }
  }

  renderAudioTags = () => {
    const { AudioComponent, artists } = this.state;
    if (AudioComponent) {
      return artists.map(artist => {
        if (artist.id === '1' || artist.id === '2') {
          return <AudioComponent 
          song={artist.artist_songlink} 
          id={artist.id}/>
        }
      });
    }
    return;
  }

  importFunction = (func, obj) => {
    import(`../../helpers/${func}`).then(Func => {
      Func.default(this, obj);
    })
  }

  renderPlayBar = () => {
    const PlayerBar = this.props.lazy(() => import('./PlayerBar'));
    const Suspense = this.props.Suspense;
    return (
      <Suspense fallback={
        <div style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          minHeight: '7rem',
          width: '100%',
          padding: '1rem 2.1rem',
          opacity: '.4',
          background: '#000000'
        }}>
        </div>
      }>
        <PlayerBar currentSongTime={{
          duration: this.state.currentSongDuration,
          progress: this.state.currentSongProgress
        }} 
        currentArtist={this.state.currentArtist}
        importFunction={this.importFunction}
        songPlaying={this.state.songPlaying}
        />
      </Suspense>
    )
  }

  componentDidMount() {
    const { window } = this.props;
    window.onload = () => {
      import('./Audio').then(
        Audio => this.setState({
          AudioComponent: Audio.default,
          opacity: '1',
          loaded: true
        }, () => {
          import('../../helpers/playSong').then(playSong => {
            //make ajax request to spotify api here and add the result 
            //to the this.state.artists array
            this.setState({
              playSong: playSong.default
            }, () => {
              this.setState(prevState => ({
                currentArtist: prevState.artists[0],
                nextArtist: prevState.artists[1]
              }), () => {
                this.setState(prevState => ({
                  currentSong: document.getElementById(prevState.currentArtist.id),
                  nextSong: document.getElementById(prevState.nextArtist.id)
                }))
              })
            })
          });
        })
      );
    }
  }

  render() {
    const { loaded } = this.state;
    if (loaded) {
      return (
        <div className="home" style={{opacity: this.state.opacity}}>
          {this.renderAudioTags()}
          <Container 
          songPlaying={this.state.songPlaying} 
          currentArtist={this.state.currentArtist} 
          importFunction={this.importFunction}
          artists={this.state.artists}
          lazy={this.props.lazy}
          Suspense={this.props.Suspense}
          />
          {this.renderPlayBar()}
        </div>
      )
    }
    return <div/>
  }
}

export default Home;