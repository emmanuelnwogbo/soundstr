import React, { Component } from 'react';
import axios from "axios";

import artists from '../../db';
import rainbowGenerator from '../../helpers/rainbow';

import Board from './Board';
import SongCard from './SongCard';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedArtists: artists,
      searchedTracks: [],
      boardData: null,
      searchTerm: 'meg',
      songPlaying: false,
      currentTrack: null
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
      this.setState({
        searchTerm: event.target.value,
        searchedTracks: []
      }, () => {
        this.fetchArtist();
      })
    }
  }

  fetchArtist = async () => {
    const { searchTerm } = this.state;
    const res = await axios.get(`https://spotify-api-wrapper.appspot.com/artist/${searchTerm}`);
    if (res.data.artists.items) {
      this.setState({
        boardData: res.data.artists.items[0]
      }, () => {
        const { boardData } = this.state;
        axios.get( `https://spotify-api-wrapper.appspot.com/artist/${
          boardData.id
        }/top-tracks`).then(res => {
          if (res.data.tracks) {
            this.setState({
              searchedTracks: res.data.tracks
            }, () => {
              console.log(this.state)
            })
          }
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }

  rendersearchedTracks = () => {
    const { searchedTracks } = this.state;
    if (searchedTracks.length === 0) {
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

  componentDidMount() {
    this.fetchArtist();
  }

  render() {
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
        {this.renderBoard()}
        {this.rendersearchedTracks()}
        <div className={`container__recommended__header`}>
          <h1 className="container__recommended__header--h1">Recommended</h1>
          <p className="container__recommended__header--para">for you</p>
        </div>
        {this.renderRecommendedSongs()}
      </div>
    )
  }
}

export default Container;