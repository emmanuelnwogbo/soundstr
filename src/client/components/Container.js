import React, {  Component } from 'react';

import Header from './Header';
import ContainerContent from './ContainerContent';

class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Header />
        <ContainerContent songPlaying={this.props.songPlaying}  currentArtist={this.props.currentArtist} playerBarStateController={this.props.playerBarStateController} artists={this.props.artists}/>
      </div>
    )
  }
}

export default Container;