import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import './scss/base/base.scss';
import './scss/base/typography.scss';
import './scss/base/animations.scss';
import './scss/home.scss';
import './scss/components/playerBar.scss';

ReactDOM.hydrate(<Home window={window}/>, document.getElementById('root'))