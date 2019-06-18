import React, { Component } from 'react';
import axios from "axios";

import artists from '../../db';
import rainbowGenerator from '../../helpers/rainbow';

import Board from './Board';
import SongCard from './SongCard';
import Controls from './Controls'

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedArtists: artists,
      searchedTracks: [],
      boardData: null,
      searchTerm: 'metric',
      songPlaying: false,
      currentTrack: artists[0].id,
      playBackState: null,
      initialVisit: true,
      initiallyPlaying: false,
      tracks: [...artists],
      noArtistFound: false,
      loop: false,
      manuallyMovedToNextSong: false,
      shuffle: false
    }
  }

  handleNextPrevStateTransition = (nextOrPrevSongCard) => {
    const { initiallyPlaying } = this.state;
    this.setState({ 
      currentTrack: nextOrPrevSongCard.firstChild.id,
      manuallyMovedToNextSong: false 
    }, () => {
      if (initiallyPlaying) {
        this.setState({ songPlaying: true })
        return this.playSong();
      }
    });
  }

  manuallyMoveToNextSong = () => {
    this.setState({ manuallyMovedToNextSong: true })
  }

  playNext = () => {
    const { currentTrack, playBackState } = this.state;
    const currentSong = document.getElementById(currentTrack);

    if (currentSong.parentElement.nextSibling !== null) {
      if (currentSong.parentElement.nextSibling.classList.contains('controls')) {
        if (playBackState !== 'ended') {
          return;
        }
        return this.setState({
          currentTrack: Array.from(document.getElementsByTagName('audio'))[0].id
        })
      }

      if (currentSong.parentElement.nextElementSibling.classList.contains('container__recommended__header')) {
        const nextSongCard = currentSong.parentElement.nextElementSibling.nextElementSibling;
        this.stopSong();
        this.handleNextPrevStateTransition(nextSongCard)
      }

      if (currentSong.parentElement.nextSibling.classList.contains('songcard')) {
        const nextSongCard = currentSong.parentElement.nextSibling;
        this.stopSong();
        this.handleNextPrevStateTransition(nextSongCard)
      }
    }
  }

  playPrev = () => {
    const { currentTrack} = this.state;
    const currentSong = document.getElementById(currentTrack);
    
    if (currentSong.parentElement.previousSibling !== null) {
      if (currentSong.parentElement.previousSibling.classList.contains('container__board')) {
        return;
      }

      if (currentSong.parentElement.previousSibling.classList.contains('container__recommended__header')) {
        const prevSongCard = currentSong.parentElement.previousSibling.previousSibling;
        this.stopSong();
        this.handleNextPrevStateTransition(prevSongCard)
      }

      if (currentSong.parentElement.previousSibling.classList.contains('songcard')) {
        const prevSongCard = currentSong.parentElement.previousSibling;
        this.stopSong();
        this.handleNextPrevStateTransition(prevSongCard)
      }
    }
  }

  playPause = (event) => {
    console.log(event.target.classList)
    if (event.target.classList.contains(`play`)) {
      console.log(event.target)

      if (this.state.currentTrack !== event.target.dataset.songmatch 
        && this.state.currentTrack !== null) {
        this.stopSong();
        return this.setState({
          songPlaying: true,
          currentTrack: event.target.dataset.songmatch
        }, () => {
          this.playSong()
        })
      }

      return this.setState({ 
        songPlaying: true,
        currentTrack: event.target.dataset.songmatch
      }, () => {
        this.playSong();
      })
    }

    return this.setState({ 
      songPlaying: false,
      currentTrack: event.target.dataset.songmatch
    }, () => {
      this.pauseSong();
    })
  }

  togglePauseState = () => {
    if (this.state.songPlaying) {
      return this.setState({ songPlaying: false });
    }

    return this.setState({ songPlaying: true });
  }

  playSong = () => {
    this.setState({ initiallyPlaying: true })
    document.getElementById(this.state.currentTrack).play().then(() => {
      console.log(document.getElementById(this.state.currentTrack).duration)
      console.log(document.getElementById(this.state.currentTrack).currentTime)
    })
  }

  pauseSong = () => {
    this.setState({ initiallyPlaying: false })
    document.getElementById(this.state.currentTrack).pause()
  }

  stopSong = () => {
    const { currentTrack } = this.state;
    document.getElementById(currentTrack).load()
    document.getElementById(currentTrack).pause()
  }

  setSearchTerm = (event) => {
    if (event.key === 'Enter') {
      event.target.blur();
      const playingSongs = this.state.searchedTracks.filter(track => track.id === this.state.currentTrack);
      console.log(playingSongs);
      if (playingSongs.length > 0) {
        this.setState({
          songPlaying: false,
          currentTrack: artists[0].id,
          playBackState: 'ended',
          initiallyPlaying: false
        })
      }
      this.setState({
        searchTerm: event.target.value,
        boardData: null,
        searchedTracks: [],
        noArtistFound: false
      }, () => {
        this.fetchArtist();
      })
    }
  }

  addEventListeners = () => {
    const audios = Array.from(document.getElementsByTagName('audio'));
    audios.forEach(audio => {
      audio.preload = "auto";
      audio.addEventListener('error', (e) => {
        console.log(e, 'there was an error playing the video')
      })
      audio.addEventListener('waiting', () => {
        this.setState({ playBackState: 'waiting' })
      });
      audio.addEventListener('playing', () => {
        this.setState({ playBackState: 'playing' })
      });
      audio.addEventListener('ended', () => {
        this.setState({ 
          playBackState: 'ended',
          songPlaying: false,
        }, () => {
          if (this.state.loop) {
            return this.setState({
              songPlaying: true
            }, () => {
              return this.playSong();
            })
          }
          this.playNext()
        })
      });
    })
  }

  handleLoop = () => {
    if (this.state.loop) {
      return this.setState({ loop: false })
    }

    return this.setState({ loop: true })
  }

  toggleShuffle = () => {
    if (this.state.shuffle) {
      return this.setState({ shuffle: false })
    }

    return this.setState({ shuffle: true })
  }

  fetchArtist = () => {
    const { searchTerm } = this.state;
    axios.get(`https://spotify-api-wrapper.appspot.com/artist/${searchTerm}`)
    .then(res => {
      //console.log(res)
      if (res.data) {
        if (res.data.artists.items.length > 0) {
          return this.setState({
            boardData: res.data.artists.items[0]
          }, () => {
            const { boardData } = this.state;
            axios.get( `https://spotify-api-wrapper.appspot.com/artist/${boardData.id}/top-tracks`)
              .then(res => {
                if (res.data.tracks) {
                  //console.log(res.data.tracks)
                  if (this.state.initialVisit) {
                    if (!this.state.songPlaying) {
                      this.setState({
                        currentTrack: res.data.tracks[0].id,
                        initialVisit: false
                      })
                    }

                    this.setState({ initialVisit: false })
                  }

                  this.setState({ 
                    searchedTracks: res.data.tracks,
                    tracks: [...res.data.tracks, ...artists]
                  }, () => {
                    const { addEventListeners } = this;
                    addEventListeners();
                  })
                }
              })
          })
        }

        return this.setState({
          noArtistFound: true
        })
      }
    }).catch(err => {
      console.log(err, 'failed')
      this.fetchArtist()
    })
  }

  rendersearchedTracks = () => {
    const { searchedTracks, noArtistFound } = this.state;
    if (searchedTracks.length === 0 && !noArtistFound) {
      return (
        <div className={`container__loading`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )
    }
    return searchedTracks.map(track => {
      return (
        <SongCard 
        key={track.id} 
        track={track}
        overlay={rainbowGenerator(
          Math.round(Math.random() * 100), 
          Math.round(Math.random() * 80)
        )}
        playPause={this.playPause}
        songPlaying={this.state.songPlaying}
        currentTrack={this.state.currentTrack}
        playBackState={this.state.playBackState}
        />
      )
    })
  }

  renderRecommendedSongs = () => {
    const { recommendedArtists } = this.state;
    return recommendedArtists.map(artist => {
      return (
        <SongCard 
        key={artist.id} 
        artist={artist}
        overlay={rainbowGenerator(
          Math.round(Math.random() * 100), 
          Math.round(Math.random() * 80)
        )}
        playPause={this.playPause}
        songPlaying={this.state.songPlaying}
        currentTrack={this.state.currentTrack}
        playBackState={this.state.playBackState}
        />
      )
    })
  }

  renderBoard = () => {
    if (this.state.boardData !== null) {
      return <Board 
      overlay={rainbowGenerator(
        Math.round(Math.random() * 100), 
        Math.round(Math.random() * 80)
      )} 
      artistDetails={this.state.boardData}/>
    }
  }

  renderNotFound = () => {
    const { noArtistFound } = this.state;
    if (noArtistFound) {
      return <div style={{
        gridColumn: `1 / -1`,
        gridRow: `span 5`,
        textAlign: `center`,
        color: `#fff`,
        fontWeight: `900`,
        fontSize: `2.5rem`
      }}><div>Couldn't Find any artist named {this.state.searchTerm}...</div>
      <div>Try a different search?</div>
      </div>
    }

    return;
  }

  componentDidMount() {
    this.fetchArtist();
  }

  render() {
    const { 
      playSong, 
      pauseSong, 
      playNext,
      playPrev, 
      togglePauseState,
      handleLoop,
      manuallyMoveToNextSong,
      toggleShuffle
    } = this;
    const { 
      songPlaying,
      currentTrack, 
      tracks,
      loop,
      shuffle
     } = this.state;
    return (
      <div className={`container`}>
        <div className={`container__header`}>
          <div className={`container__header__name`}>
            <p>Sungr</p>
          </div>
          <div className={`container__header__inputfield`}>
            <input 
            className={`container__header__inputfield--input`} 
            placeholder={`Find an Artist`}
            onKeyDown={this.setSearchTerm}/>
          </div>
      </div>
      {this.renderNotFound()}
      {this.renderBoard()}
      {this.rendersearchedTracks()}
      <div className={`container__recommended__header`}>
        <h1 className="container__recommended__header--h1">Recommended</h1>
        <p className="container__recommended__header--para">for you</p>
      </div>
      {this.renderRecommendedSongs()}
      <Controls 
      playSong={playSong}
      pauseSong={pauseSong}
      playNext={playNext}
      playPrev={playPrev}
      togglePauseState={togglePauseState}
      songPlaying={songPlaying}
      tracks={tracks}
      currentTrack={currentTrack}
      loop={loop}
      handleLoop={handleLoop}
      manuallyMoveToNextSong={manuallyMoveToNextSong}
      shuffle={shuffle}
      toggleShuffle={toggleShuffle}/>
    </div>
    )
  }
}

export default Container;