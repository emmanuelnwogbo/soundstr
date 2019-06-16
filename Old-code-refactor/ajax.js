const { searchTerm } = this.state;
const res = await axios.get(`https://spotify-api-wrapper.appspot.com/artist/${searchTerm}`);
if (res.data.artists.items) {
  this.setState({
    boardData: res.data.artists.items[0]
  }, () => {
    const { boardData } = this.state;
    axios.get( `https://spotify-api-wrapper.appspot.com/artist/${
      boardData.id
    }/top-tracks`).then(res => {
      if (res.data.tracks) {
        const { initialVisit } = this.state;

        if (initialVisit) {
          this.setState(prevState => {
            return { 
              searchedTracks: res.data.tracks,
              tracks: [...res.data.tracks, ...prevState.tracks],
              initialVisit: false 
            }
          }, () => {
            const { tracks } = this.state;
            this.setState({ 
              currentTrack: tracks[0].id,
              currentTrackMeta: {
                name: tracks[0].artists[0].name,
                nameOfTrack: tracks[0].name
              }
             }, () => {
              this.addEventListeners();
            })
          })
        }

        if (!initialVisit) {
          const { tracks, currentTrack } = this.state;
          console.log('initial visit', initialVisit)
          this.setState(prevState => {
            return {
              searchedTracks: res.data.tracks,
              tracks: [...res.data.tracks, ...prevState.tracks]
            }
          }, () => {
            console.log(this.state, 'final')
          })
        }
      }
    }).catch(err => {
      console.log(err)
    })
  })
}