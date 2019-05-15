import React, { Component } from 'react';

import Container from './Container';
import PlayerBar from './PlayerBar';

import artists from '../../db'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioComponent: null,
      spotifyArtistsSongs: [],
      cloudinaryArtists: artists,
      currentArtist: artists[0],
      currentSongId: artists[0].id,
      currentSong: null,
      songPlaying: false,
      loop: false,
      shuffle: false,
      manuallyMoveToNextSong: false,
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

  updateSongTime = () => {

  }

  shuffleSong = () => {
    if (this.state.shuffle) {
      return this.setState({ shuffle: false })
    }
    
    this.setState({ shuffle: true })
  }

  manuallyMoveToNextSong = () => {
    this.setState({ manuallyMoveToNextSong: true }, () => {
      this.nextSong();
      this.setState({ manuallyMoveToNextSong: false })
    })
  }

  loopSong = () => {
    if (this.state.loop) {
      return this.setState({ loop: false })
    }

    this.setState({ loop: true })
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
          this.playSong()
        })
    }
  }

  nextSong = () => {
    const { currentArtist, cloudinaryArtists } = this.state;
    if (!this.state.manuallyMoveToNextSong && this.state.loop) {
      return this.playSong();
    }
    if (!this.state.manuallyMoveToNextSong && this.state.shuffle) {
      if (cloudinaryArtists.includes(currentArtist)) {
        const nextArtist = cloudinaryArtists[Math.floor(Math.random()*cloudinaryArtists.length)];
        return this.setState({
          currentArtist: nextArtist
        }, () => {
          this.playSong();
        })
      }
      return;
    }
    if (cloudinaryArtists.includes(currentArtist)) {
      if (cloudinaryArtists.indexOf(currentArtist) === cloudinaryArtists.length-1) {
        return this.endSong();
      }
      const result = cloudinaryArtists.filter(artist => cloudinaryArtists.indexOf(artist) > cloudinaryArtists.indexOf(currentArtist));
      return this.setState({
         currentArtist: result[0]
        }, () => {
          this.playSong()
        })
    }
  }

  endSong = () => {
    const { 
      currentArtist,
      cloudinaryArtists
    } = this.state;
    if (cloudinaryArtists.includes(currentArtist)) {
      return this.setState({
        currentArtist: artists[0],
        currentSongId: artists[0].id,
        songPlaying: false
      }, () => {
        this.setState(prevState => ({
          currentSong: document.getElementById(prevState.currentArtist.id)
        }))
      })
    }
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
        currentSong.load();
        return this.setState(prevState => ({
          currentSongId: prevState.currentArtist.id,
          currentSong: document.getElementById(prevState.currentArtist.id)
        }), () => {
          const { currentSong } = this.state;
          currentSong.play().then(() => {
            console.log(this.state)
            currentSong.addEventListener('ended', () => {
              this.nextSong();
            })
          });
        }); 
      }
  
      currentSong.play().then(() => {
        console.log(this.state)
        //console.log('song playing')
      });
      return;
    }

    currentSong.pause();
  }

  renderAudioTags = () => {
    if (this.state.audioComponent !== null) {
      return this.state.cloudinaryArtists.map(artist => {
        //prod code
        //return <this.state.audioComponent song={artist.artist_songlink} id={artist.id}/>
        //dev code 
          if (artist.id === '1') {
            return <this.state.audioComponent song={artist.artist_songlink} id={artist.id}/>
          }
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
              this.nextSong();
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
        <PlayerBar shuffle={this.state.shuffle} shuffleSong={this.shuffleSong} manuallyMoveToNextSong={this.manuallyMoveToNextSong} loopSong={this.loopSong} loop={this.state.loop} nextSong={this.nextSong} prevSong={this.prevSong} songPlaying={this.state.songPlaying} currentArtist={this.state.currentArtist} playerBarStateController={this.playerBarStateController}/>
      </div>
    )
  }
}

export default Home;