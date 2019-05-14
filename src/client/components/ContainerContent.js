import React, {  Component } from 'react';

import SongCard from './SongCard';
import SearchedSongCard from './SearchedSongCard';

class ContainerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: null,
      searchedSongs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }

  renderSongs = () => {
    if (this.state.artists !== null) {
      return this.state.artists.map(artist => {
        return <SongCard songPlaying={this.props.songPlaying} currentArtist={this.props.currentArtist} playerBarStateController={this.props.playerBarStateController} key={artist.id} artist={artist}/>
      })
    }
    return;
  }

  renderSearchedSongs = () => {
    return this.state.searchedSongs.map(song => {
      return <SearchedSongCard key={song}/>
    })
  }

  componentDidMount() {
    const { artists } = this.props
    this.setState({ artists })
  }

  render() {
    return (
      <div className="containercontent">
        <div className="containercontent--header">
          <h1 className="containercontent--h1">Top Trending</h1>
          <p  className="containercontent--para">By {'artist name'}</p>
        </div>
        {this.renderSearchedSongs()}
        <div className="containercontent--header">
          <h1 className="containercontent--h1">Recommended</h1>
          <p className="containercontent--para">for you</p>
        </div>
        {this.renderSongs()}
      </div>
    )
  }
}

export default ContainerContent;