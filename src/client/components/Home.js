import React, { Component } from 'react';

import Container from './Container';
import PlayerBar from './PlayerBar';
import Header from './Header';
import Sidenav from './Sidenav';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="home">
        <Header />
        <Sidenav />
        <Container />
        <PlayerBar />
      </div>
    )
  }
}

export default Home;