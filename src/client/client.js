import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import './scss/base.scss'

ReactDOM.hydrate(<Home />, document.getElementById('root'))