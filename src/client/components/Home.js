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
        <img src="https://res.cloudinary.com/dxlhzerlq/image/upload/c_scale,h_121,q_62/v1545772378/Evergreen_Album_by_Broods_jimqqp.png"/>
        <svg className="app__name--svg" id="app__name--svg">
          <use xlinkHref="./sprite.svg#icon-react" />
        </svg>
        <button onClick={() => console.log('hi there')}>Press Me!</button>
        <Container />
      </div>
    )
  }
}

export default Home;