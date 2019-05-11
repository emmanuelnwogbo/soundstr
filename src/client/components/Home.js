import React,{ Component } from 'react';

import Container from './Container'

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>I'm the home app</div>
        <p>hello there</p>
        <Container />
      </div>
    )
  }
}

export default Home;