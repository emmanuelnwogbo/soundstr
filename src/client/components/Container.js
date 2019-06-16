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
      tracks: [...artists],
      noArtistFound: false,
      currentTrackMeta: {
        name: artists[0].artist_name,
        nameOfTrack: artists[0].artist_songname
      }
    }
  }

  handleNextPrevStateTransition = (nextOrPrevSongCard) => {
    this.setState({ currentTrack: nextOrPrevSongCard.firstChild.id }, () => {
      return this.playSong();
    });
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
    const { currentTrack } = this.state;
    document.getElementById(currentTrack).play()
  }

  pauseSong = () => {
    const { currentTrack } = this.state;
    document.getElementById(currentTrack).pause()
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
          playBackState: 'ended'
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
          this.playNext()
        })
      });
    })
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
                    this.setState({
                      currentTrack: res.data.tracks[0].id,
                      initialVisit: false
                    })
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
        textAlign: `center`,
        color: `#fff`,
        fontWeight: `900`,
        fontSize: `2.5rem`
      }}>No Artist Found... Try a different search?</div>
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
      togglePauseState
    } = this;
    const { 
      songPlaying,
      currentTrack, 
      tracks
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
      currentTrack={currentTrack}/>
    </div>
    )
  }
}

export default Container;