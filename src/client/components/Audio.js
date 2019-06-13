import React from 'react';

const Audio = ({ songSrc, id }) => {
  return (
    <audio controls="controls" style={{
      display: `none`
    }} id={id} preload="auto">
      <source src={songSrc} type="audio/mp3" />
    </audio>
  )
}

export default Audio;