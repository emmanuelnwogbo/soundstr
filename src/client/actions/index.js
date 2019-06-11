export const FETCH_SONG = 'fetch_song';

export const fetchSong = ()  => {
  const song = 'hello song';

  dispatch({
    type: FETCH_SONG,
    payload: song
  })
}
