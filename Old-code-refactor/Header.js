import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header--name">
          <p>Sungr</p>
        </div>
        <div className="header__input--area">
          <input className="header--input" placeholder="search for an artist"/>
        </div>
      </div>
    )
  }
}

export default Header;