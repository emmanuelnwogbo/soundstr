import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import Home from '../client/components/Home'

const renderer = (store) => {
  const content = renderToString(
    <Provider store={store}>
      <Home />
    </Provider>
    );
  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900" rel="stylesheet">
      </head>
      <body>
        <div id="root">${'hello there from server'}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
}

export default renderer
