const playerBarStateControl = (component, obj) => {
  const { currentArtist } = obj;
  const { playSong } = component.state;
  const playerBarStateController = (currentArtist) => {
    if (component.state.currentArtist !== currentArtist) {
      return component.setState({ 
        currentArtist,
        songPlaying: true
      }, playSong(component));
    }   
  
    if (component.state.songPlaying) {
      return component.setState({ songPlaying: false }, playSong(component))
    }
  
    if (!component.state.songPlaying) {
      return component.setState({ songPlaying: true }, playSong(component))
    }
  }
  playerBarStateController(currentArtist)
}

/*const playerBarStateController = (currentArtist) => {
  if (this.state.currentArtist !== currentArtist) {
    return this.setState({ 
      currentArtist,
      songPlaying: true
    }, this.playSong);
  }

  if (this.state.songPlaying) {
    return this.setState({ songPlaying: false }, this.playSong)
  }

  if (!this.state.songPlaying) {
    return this.setState({ songPlaying: true }, this.playSong)
  }
}*/

export default playerBarStateControl;