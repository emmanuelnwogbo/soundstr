const playSong = (component) => {
  const { 
    artists,
    currentArtist,
    currentSong,
    nextArtist,
    nextSong, 
    songPlaying,
    shuffle
  } = component.state
  console.log(
    artists,
    currentArtist,
    nextArtist, 
    currentSong,
    nextSong,
    songPlaying,
    shuffle,
    'from playsong function'
    );

  currentSong.play().then(() => {
    console.log('playing', currentSong)
  })
}

export default playSong;