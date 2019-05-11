import React, { Component } from 'react';

import Container from './Container'

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="home">
        <div>I'm the home app</div>
        <p>hello there</p>
        <button onClick={() => console.log('hi there')}>Press Me!</button>
        <Container />
      </div>
    )
  }
}

export default Home;