import React, { Component } from 'react';

import Container from './Container';
import PlayerBar from './PlayerBar';

import artists from '../../db'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioComponent: null,
      //artists: artists,
      spotifyArtistsSongs: [],
      cloudinaryArtists: artists,
      currentArtist: artists[0],
      currentSongId: artists[0].id,
      currentSong: null,
      songPlaying: false
    }
  }

  playerBarStateController = (currentArtist) => {
    if (this.state.currentArtist !== currentArtist) {
      return this.setState({ 
        currentArtist,
        songPlaying: true
      }, this.playSong);
    }

    if (this.state.songPlaying) {
      return this.setState({ songPlaying: false }, this.playSong)
    }

    if (!this.state.songPlaying) {
      return this.setState({ songPlaying: true }, this.playSong)
    }
  }

  prevSong = () => {
    const { currentArtist, cloudinaryArtists } = this.state;
    if (cloudinaryArtists.includes(currentArtist)) {
      if (cloudinaryArtists.indexOf(currentArtist) === 0) {
        return console.log('this is the first element in the array')
      }
      const result = cloudinaryArtists.filter(artist => cloudinaryArtists.indexOf(artist) < cloudinaryArtists.indexOf(currentArtist));
      return this.setState({
         currentArtist: result[result.length-1]
        }, () => {
          //console.log(this.state);
          this.playSong()
        })
    }
  }

  nextSong = () => {
    const { currentArtist, cloudinaryArtists } = this.state;
    if (cloudinaryArtists.includes(currentArtist)) {
      if (cloudinaryArtists.indexOf(currentArtist) === cloudinaryArtists.length-1) {
        return console.log('this is the last element in the array')
      }
      const result = cloudinaryArtists.filter(artist => cloudinaryArtists.indexOf(artist) > cloudinaryArtists.indexOf(currentArtist));
      return this.setState({
         currentArtist: result[0]
        }, () => {
          //console.log(this.state);
          this.playSong()
        })
    }
  }

  endSong = () => {
    this.setState({ songPlaying: false })
  }

  playSong = () => {
    const { 
      currentArtist, 
      currentSong, 
      currentSongId, 
      songPlaying 
    } = this.state;
    
    if (songPlaying) {
      if (currentArtist.id !== currentSongId) {
        //console.log('different song')
        currentSong.load();
        return this.setState(prevState => ({
          currentSongId: prevState.currentArtist.id,
          currentSong: document.getElementById(prevState.currentArtist.id)
        }), () => {
          const { currentSong } = this.state;
          currentSong.play().then(() => {
            currentSong.addEventListener('ended', () => {
              this.endSong();
            })
          });
        }); 
      }
  
      currentSong.play().then(() => {
        //console.log(this.state)
        //console.log('song playing')
      });
      return;
    }

    currentSong.pause();
  }

  renderAudioTags = () => {
    if (this.state.audioComponent !== null) {
      return this.state.cloudinaryArtists.map(artist => {
        return <this.state.audioComponent song={artist.artist_songlink} id={artist.id}/>
      })
    }
    return;
  }

  componentDidMount() {
    this.props.window.onload = () => {
      import('./Audio').then(
        Audio => this.setState({
          audioComponent: Audio.default
        }, () => {
          this.setState(prevState => ({
            currentSong: document.getElementById(prevState.currentArtist.id)
          }), () => {
            const { currentSong } = this.state;
            currentSong.addEventListener('ended', () => {
              this.endSong();
            })
          })
        })
      )
    }
  }

  render() {
    return (
      <div className="home">
        {this.renderAudioTags()}
        <Container songPlaying={this.state.songPlaying} currentArtist={this.state.currentArtist} playerBarStateController={this.playerBarStateController} artists={this.state.cloudinaryArtists}/>
        <PlayerBar nextSong={this.nextSong} prevSong={this.prevSong} songPlaying={this.state.songPlaying} currentArtist={this.state.currentArtist} playerBarStateController={this.playerBarStateController}/>
      </div>
    )
  }
}

export default Home;