import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import './scss/main.scss';

import Home from './components/Home';

ReactDOM.hydrate(
  <Home 
  lazy={lazy} 
  Suspense={Suspense} 
  window={window}/>, document.getElementById('root')
  )