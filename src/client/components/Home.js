import React, { Component } from 'react';

import Container from './Container';
import PlayerBar from './PlayerBar';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="home">
        <Container />
        <PlayerBar />
      </div>
    )
  }
}

export default Home;