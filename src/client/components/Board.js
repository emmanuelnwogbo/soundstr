import React from 'react';

const Board = ({ artistDetails, overlay }) => {
  console.log(artistDetails)
  const returnGenres = () => {
    return artistDetails.genres.map(genre => {
      return (
        <span>{genre}</span>
      )
    })
  }

  const openArtistProfile = () => {
    const win = window.open(artistDetails.external_urls.spotify, '_blank');
    win.focus();
  }

  const returnImage = () => {
    if (artistDetails.images[0] !== undefined && artistDetails.images[0] !== null) {
      return (
        <figure>
          <img src={`${artistDetails.images[0].url}`}/>
        </figure>
      )
    }

    return;
  }

  return (
    <div className={`container__board`}>
      <span style={{
        background: `${overlay}`
      }} className={`container__board--overlay`}></span>
      {returnImage()}
      <h3 className={`container__board__genres--h3 container__board__genres--h3-name`}>{artistDetails.name}</h3>
      <h3 className={`container__board__genres--h3`}>Genres</h3>
      <div className={`container__board__genres`}>
        {returnGenres()}
      </div>
      <span onClick={openArtistProfile} className={`container__board--btn`}>view profile</span>
    </div>
  )
}

export default Board;