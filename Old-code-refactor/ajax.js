if (res.data) {
  if (res.data.artists.items.length > 0) {
    return this.setState({
      boardData: res.data.artists.items[0]
    }, () => {
      const { boardData } = this.state;
      axios.get( `https://spotify-api-wrapper.appspot.com/artist/${boardData.id}/top-tracks`)
        .then(res => {
          if (res.data.tracks) {
            //console.log(res.data.tracks)
            if (this.state.initialVisit) {
              if (!this.state.songPlaying) {
                return this.setState({
                  currentTrack: res.data.tracks[0].id,
                  initialVisit: false
                })
              }

              this.setState({ initialVisit: false })
            }

            this.setState({ 
              searchedTracks: res.data.tracks,
              tracks: [...res.data.tracks, ...artists]
            }, () => {
              const { addEventListeners } = this;
              addEventListeners();
            })
          }
        })
    })
  }

  return this.setState({
    noArtistFound: true
  })
}