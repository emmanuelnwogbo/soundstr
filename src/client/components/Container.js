import React, { Component } from 'react';
import axios from "axios";

import artists from '../../db';
import '../scss/components/container.scss'

import Board from './Board';
import SongCard from './SongCard';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedArtists: artists,
      searchedTracks: [],
      boardData: null
    }
  }

  fetchArtist = async () => {
    const res = await axios.get(`https://spotify-api-wrapper.appspot.com/artist/meg`);
    if (res.data.artists.items) {
      this.setState({
        boardData: res.data.artists.items[0]
      }, () => {
        const { boardData } = this.state;
        axios.get( `https://spotify-api-wrapper.appspot.com/artist/${
          boardData.id
        }/top-tracks`).then(res => {
          //console.log(res)
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
    return searchedTracks.map(track => {
      return (
        <SongCard key={track.id} track={track}/>
      )
    })
  }

  renderRecommendedSongs = () => {
    const { recommendedArtists } = this.state;
    return recommendedArtists.map(artist => {
      return (
        <SongCard key={artist.id} artist={artist}/>
      )
    })
  }

  renderBoard = () => {
    if (this.state.boardData !== null) {
      return <Board artistDetails={this.state.boardData}/>
    }
  }

  componentDidMount() {
    this.fetchArtist();
  }

  render() {
    return (
      <div className={`container`}>
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