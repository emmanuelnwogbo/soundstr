import React, { Component } from 'react';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    }
  }

  changeValue = (e) => {
    const { value } = e.target;
    this.setState({ value });
  }

  render() {
    return (
      <input
        className={`controls__slider`} 
        min="1" max="10" value={1} type='range'
        onChange={this.changeValue}></input>
    )
  }
}

export default Slider;