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
        <ContainerContent 
        songPlaying={this.props.songPlaying}  
        currentArtist={this.props.currentArtist} 
        importFunction={this.props.importFunction}
        artists={this.props.artists}
        lazy={this.props.lazy}
        Suspense={this.props.Suspense} 
        />
      </div>
    )
  }
}

export default Container;