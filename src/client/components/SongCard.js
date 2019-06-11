import React, { Component } from 'react';
import '../scss/components/songcard.scss';

class SongCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={`songcard`}>
        song
      </div>
    )
  }
}

export default SongCard;