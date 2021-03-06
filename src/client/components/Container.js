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
        <ContainerContent />
      </div>
    )
  }
}

export default Container;