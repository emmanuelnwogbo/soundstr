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
      <div>
        <audio controls="controls" id={id}>
          <source src={song} type="audio/mp3" />
        </audio>
      </div>
    )
  }
}

export default Audio;