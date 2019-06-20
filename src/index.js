import './scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import Container from './components/Container';

ReactDOM.hydrate(
  <Container />, 
  document.getElementById('root'))