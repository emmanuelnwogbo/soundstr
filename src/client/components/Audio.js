import React, { Component } from 'react';

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false
    }
  }

  render() {
    const { song, id } = this.props;
    return (
      <audio controls="controls" id={id} preload="auto">
        <source src={song} type="audio/mp3" />
      </audio>
    )
  }
}

export default Audio;