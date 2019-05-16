import React, { Component } from 'react';

import Container from './Container';
import PlayerBar from './PlayerBar';

import artists from '../../db';
import Utils from '../../helpers/Utils';
const { convertSeconds } = Utils;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioComponent: null,
      spotifyArtistsSongs: [],
      cloudinaryArtists: artists,
      currentArtist: artists[0],
      nextArtist: artists[1],
      currentSongId: artists[0].id,
      currentSong: null,
      nextSong: null,
      currentSongProgress: '0:00',
      currentSongDuration: '0:00',
      songPlaying: false,
      playerHandle: null,
      timeline: null,
      timelineWidth: null,
      loop: false,
      shuffle: false,
      manuallyMoveToNextSong: false,
    }
  }

  playerBarStateController = (currentArtist) => {
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
  }

  getPosition = (element) => {
    return element.getBoundingClientRect().left;
  }

  clickPercent = (e) => {
    return (e.clientX - this.getPosition(this.state.timeline))/this.state.timelineWidth
  }

  movePlay = (e) => {
    const { timeline, timelineWidth, playerHandle } = this.state;
    let movement = e.clientX - this.getPosition(timeline);
    if (movement > timelineWidth) {
      //this.mouseUp();
      //return console.log('exceded limit there boy')
    }
    if (movement >= 0 && movement <= timelineWidth) {
      return document.getElementById('playerbar--progressbar-handle').style.transform = `translateX(${movement}px)`;
    }
    if (movement < 0) {
      return document.getElementById('playerbar--progressbar-handle').style.transform = `translateX(${0}px)`;
    }
  }

  mouseDown = () => {
    const { window } = this.props;
    const { currentSong } = this.state;
    window.addEventListener('mousemove', this.movePlay);
    currentSong.removeEventListener('timeupdate', this.timeUpdate, false);
    console.log(this.state)
  }

  mouseUp = () => {
    const { window } = this.props;
    const { currentSong } = this.state;
    if (currentSong.currentTime === currentSong.duration) {
      return currentSong.duration = 0;
    }
    window.removeEventListener('mousemove', this.movePlay)
    currentSong.currentTime = currentSong.duration * this.clickPercent(event);
    currentSong.addEventListener('timeupdate', this.timeUpdate, false);
    console.log('bye handle', this.state)
  }

  setPlayerProgressHandle = () => {
    this.setState({ 
      playerHandle: document.getElementById('playerbar--progressbar-handle'),
      timeline: document.getElementById('playerbar--progressbar-parent')
    }, () => {
      this.setState(prevState => ({
        timelineWidth: prevState.timeline.offsetWidth - prevState.playerHandle.offsetWidth
      }), () => {
        const { window } = this.props;
        const { playerHandle, timeline } = this.state;
        timeline.addEventListener('click', () => {
          //console.log('hello')
        });
        playerHandle.addEventListener('mousedown', this.mouseDown, false);
        playerHandle.addEventListener('mouseup', this.mouseUp, false);
        //window.addEventListener('mouseup', this.mouseUp, false);
      })
    })
  }

  timeUpdate = (e) => {
    this.updateCurrentSongTime(e)
  }

  updateCurrentSongTime = (e) => {
    const { currentSong, currentSongDuration, timelineWidth} = this.state;
    console.log(currentSong.currentTime)
    if (currentSongDuration === 'NaN:NaN') {
      return this.setState({ 
        currentSongProgress: '0:00',
        currentSongDuration: '0:00' 
      });
    }
    const currentSongProgress = `${convertSeconds(Math.floor(currentSong.currentTime))}`;
    const songDuration = `${convertSeconds(Math.floor(currentSong.duration))}`;
    this.setState({ 
      currentSongProgress,
      currentSongDuration: songDuration 
    }, () => {
      if (songDuration !== currentSongProgress && currentSong.duration) {
        let playPercent = timelineWidth * (currentSong.currentTime / currentSong.duration);
        document.getElementById('playerbar--progressbar-handle').style.transform = `translateX(${playPercent}px)`;
        //document.getElementById('progressBarProgress').style.width = `${playPercent}px`
       }
    });
  }

  shuffleSong = () => {
    if (this.state.shuffle) {
      return this.setState({ shuffle: false })
    }
    
    this.setState({ shuffle: true })
  }

  manuallyMoveToNextSong = () => {
    this.setState({ manuallyMoveToNextSong: true }, () => {
      this.nextSong();
      this.setState({ manuallyMoveToNextSong: false })
    })
  }

  loopSong = () => {
    if (this.state.loop) {
      return this.setState({ loop: false })
    }

    this.setState({ loop: true })
  }

  prevSong = () => {
    this.state.currentSong.currentTime = 0;
    const { currentArtist, cloudinaryArtists, currentSong} = this.state;
    currentSong.currentTime = 0;
    if (cloudinaryArtists.includes(currentArtist)) {
      if (cloudinaryArtists.indexOf(currentArtist) === 0) {
        return console.log('this is the first element in the array')
      }
      const result = cloudinaryArtists.filter(artist => cloudinaryArtists.indexOf(artist) < cloudinaryArtists.indexOf(currentArtist));
      const result2 = cloudinaryArtists.filter(artist => cloudinaryArtists.indexOf(artist > cloudinaryArtists.indexOf(currentArtist)))
      return this.setState({
         currentArtist: result[result.length-1],
         nextArtist: result2[0]
        }, () => {
          this.playSong()
        })
    }
  }

  nextSong = () => {
    const { currentArtist, cloudinaryArtists, currentSong } = this.state;
    if (cloudinaryArtists.includes(currentArtist)) {
      if (cloudinaryArtists.indexOf(currentArtist) === cloudinaryArtists.length-1 && this.state.manuallyMoveToNextSong) {
        return;
      }
    }

    if (!this.state.manuallyMoveToNextSong && this.state.loop) {
      return this.playSong();
    }
    if (!this.state.manuallyMoveToNextSong && this.state.shuffle) {
      if (cloudinaryArtists.includes(currentArtist)) {
        const randomArtist = cloudinaryArtists[Math.floor(Math.random()*cloudinaryArtists.length)];
        return this.setState({
          currentArtist: randomArtist
        }, () => {
          this.playSong();
        })
      }
      return;
    }
    if (cloudinaryArtists.includes(currentArtist)) {
      if (cloudinaryArtists.indexOf(currentArtist) === cloudinaryArtists.length-2) {
        currentSong.load();
        return this.setState({
          currentArtist: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0],
          currentSongId: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0].id,
        }, () => {
          this.setState(prevState => ({
            currentSong: document.getElementById(prevState.currentArtist.id)
          }), () => {
            console.log(this.state)
            this.playSong();
          })
        })
      }
    }

    if (cloudinaryArtists.includes(currentArtist)) {
      if (cloudinaryArtists.indexOf(currentArtist) === cloudinaryArtists.length-1) {
        return this.endSong();
      }
      const result = cloudinaryArtists.filter(artist => cloudinaryArtists.indexOf(artist) > cloudinaryArtists.indexOf(currentArtist));
      return this.setState({
         currentArtist: result[0],
         nextArtist: result[1]
        }, () => {
          this.playSong()
        })
    }
  }

  endSong = () => {
    const { 
      currentArtist,
      cloudinaryArtists
    } = this.state;
    if (cloudinaryArtists.includes(currentArtist)) {
      return this.setState({
        currentArtist: artists[0],
        currentSongId: artists[0].id,
        songPlaying: false
      }, () => {
        this.setState(prevState => ({
          currentSong: document.getElementById(prevState.currentArtist.id)
        }))
      })
    }
  }

  playSong = () => {
    const { 
      currentArtist, 
      currentSong,
      nextSong, 
      currentSongId, 
      songPlaying,
      cloudinaryArtists,
      shuffle
    } = this.state;
    
    if (songPlaying) {
      console.log(this.state, 'play next song')
      if (currentArtist.id !== currentSongId) {
        this.state.currentSong.currentTime = 0;
        currentSong.load();
        return this.setState(prevState => ({
          currentSongId: prevState.currentArtist.id,
          currentSong: document.getElementById(prevState.currentArtist.id),
          nextSong: document.getElementById(prevState.nextArtist.id),
        }), () => {
          const { currentSong, cloudinaryArtists } = this.state;
          currentSong.play().then(() => {
            console.log(this.state)
            currentSong.addEventListener('timeupdate', this.timeUpdate, false)
            currentSong.addEventListener('ended', () => {
              if (shuffle) {
                return this.nextSong();
              }
              if (cloudinaryArtists.includes(currentArtist)) {
                if (cloudinaryArtists.indexOf(currentArtist) === cloudinaryArtists.length-1) {
                  return this.endSong();
                }
              }
              if (cloudinaryArtists.includes(currentArtist)) {
                if (cloudinaryArtists.indexOf(currentArtist) === cloudinaryArtists.length-2) {
                  return this.setState({
                    currentArtist: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0],
                    currentSongId: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0].id,
                  }, () => {
                    this.setState(prevState => ({
                      currentSong: document.getElementById(prevState.currentArtist.id)
                    }), () => {
                      console.log(this.state)
                      this.playSong();
                    })
                  })
                }
              }
              return this.setState({
                currentArtist: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0],
                nextArtist: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+2}`)[0],
                currentSongId: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0].id,
              }, () => {
                this.setState(prevState => ({
                  currentSong: document.getElementById(prevState.currentArtist.id),
                  nextSong: document.getElementById(prevState.nextArtist.id)
                }), () => {
                  console.log(this.state)
                  this.playSong();
                })
              })
            })
          });
        }); 
      }
  
      currentSong.play().then(() => {
        console.log('song playing')
        console.log(this.state)
        currentSong.addEventListener('timeupdate', this.timeUpdate, false);
        currentSong.addEventListener('ended', () => {
          if (shuffle) {
            return this.nextSong();
          }
          if (cloudinaryArtists.includes(currentArtist)) {
            if (cloudinaryArtists.indexOf(currentArtist) === cloudinaryArtists.length-1) {
              return this.endSong();
            }
          }
          if (cloudinaryArtists.includes(currentArtist)) {
            if (cloudinaryArtists.indexOf(currentArtist) === cloudinaryArtists.length-2) {
              return this.setState({
                currentArtist: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0],
                currentSongId: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0].id,
              }, () => {
                this.setState(prevState => ({
                  currentSong: document.getElementById(prevState.currentArtist.id)
                }), () => {
                  console.log(this.state)
                  this.playSong();
                })
              })
            }
          }
          return this.setState({
            currentArtist: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0],
            nextArtist: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+2}`)[0],
            currentSongId: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0].id,
          }, () => {
            this.setState(prevState => ({
              currentSong: document.getElementById(prevState.currentArtist.id),
              nextSong: document.getElementById(prevState.nextArtist.id)
            }), () => {
              console.log(this.state)
              this.playSong();
            })
          })
        })
      });
      return;
    }

    currentSong.pause();
  }

  renderAudioTags = () => {
    if (this.state.audioComponent !== null) {
      return this.state.cloudinaryArtists.map(artist => {
        //prod code
        return <this.state.audioComponent song={artist.artist_songlink} id={artist.id}/>
        //dev code 
          /*if (artist.id === '1' || artist.id === '2') {
            return <this.state.audioComponent song={artist.artist_songlink} id={artist.id}/>
          }*/
      })
    }
    return;
  }

  componentDidMount() {
    const { window } = this.props;
    window.onload = () => {
      import('./Audio').then(
        Audio => this.setState({
          audioComponent: Audio.default
        }, () => {
          this.setState(prevState => ({
            currentSong: document.getElementById(prevState.currentArtist.id),
            nextSong: document.getElementById(prevState.nextArtist.id)
          }), () => {
            const { currentSong, currentArtist, nextSong, cloudinaryArtists, shuffle } = this.state;
            currentSong.addEventListener('ended', () => {
              if (shuffle) {
                return this.nextSong();
              }
              if (cloudinaryArtists.includes(currentArtist)) {
                if (cloudinaryArtists.indexOf(currentArtist) === cloudinaryArtists.length-1) {
                  return this.endSong();
                }
              }
              if (cloudinaryArtists.includes(currentArtist)) {
                if (cloudinaryArtists.indexOf(currentArtist) === cloudinaryArtists.length-2) {
                  return this.setState({
                    currentArtist: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0],
                    currentSongId: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0].id,
                  }, () => {
                    this.setState(prevState => ({
                      currentSong: document.getElementById(prevState.currentArtist.id)
                    }), () => {
                      console.log(this.state)
                      this.playSong();
                    })
                  })
                }
              }
              return this.setState({
                currentArtist: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0],
                nextArtist: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+2}`)[0],
                currentSongId: cloudinaryArtists.filter(artist => artist.id === `${new Number(currentSong.id)+1}`)[0].id,
              }, () => {
                this.setState(prevState => ({
                  currentSong: document.getElementById(prevState.currentArtist.id),
                  nextSong: document.getElementById(prevState.nextArtist.id)
                }), () => {
                  console.log(this.state)
                  this.playSong();
                })
              })
            })
          })
        })
      )
    }
  }

  render() {
    return (
      <div className="home">
        {this.renderAudioTags()}
        <Container 
        songPlaying={this.state.songPlaying} 
        currentArtist={this.state.currentArtist} 
        playerBarStateController={this.playerBarStateController} 
        artists={this.state.cloudinaryArtists}/>
        <PlayerBar currentSongTime={{
          duration: this.state.currentSongDuration,
          progress: this.state.currentSongProgress
        }} 
        setPlayerProgressHandle={this.setPlayerProgressHandle}
        shuffle={this.state.shuffle} 
        shuffleSong={this.shuffleSong} 
        manuallyMoveToNextSong={this.manuallyMoveToNextSong} 
        loopSong={this.loopSong} loop={this.state.loop} 
        nextSong={this.nextSong} prevSong={this.prevSong} 
        songPlaying={this.state.songPlaying} 
        currentArtist={this.state.currentArtist} 
        playerBarStateController={this.playerBarStateController}/>
      </div>
    )
  }
}

export default Home;