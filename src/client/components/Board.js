import React, { Component } from 'react';
import '../scss/components/container.scss';

const Board = ({ artistDetails }) => {
  console.log(artistDetails)
  return (
    <div className={`container__board`}>
      <figure>
        <img src={`${artistDetails.images[0].url}`}/>
      </figure>
    </div>
  )
}

export default Board;