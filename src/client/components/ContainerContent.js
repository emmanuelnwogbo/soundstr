import React, {  Component } from 'react';

import SongCard from './SongCard';
import SearchedSongCard from './SearchedSongCard';

class ContainerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      searchedSongs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }

  renderSongs = () => {
    return this.state.songs.map(song => {
      return <SongCard key={song} id={song}/>
    })
  }

  renderSearchedSongs = () => {
    return this.state.searchedSongs.map(song => {
      return <SearchedSongCard key={song}/>
    })
  }

  render() {
    return (
      <div className="containercontent">
        {this.renderSearchedSongs()}
        {this.renderSongs()}
      </div>
    )
  }
}

export default ContainerContent;