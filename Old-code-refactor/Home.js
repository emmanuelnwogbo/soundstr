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
      volumeHandle: null,
      volumeTimeline: null,
      volumeTimelineWidth: null,
      loop: false,
      shuffle: false,
      manuallyMoveToNextSong: false,
      seeking: false,
      seekMode: 'off',
      currentSongVolume: null
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

  clickPercentVolume = (e) => {
    return (e.clientX - this.getPosition(this.state.volumeTimeline))/this.state.volumeTimelineWidth
  }

  movePlay = (e) => {
    const { timeline, timelineWidth, playerHandle} = this.state;
    let movement = e.clientX - this.getPosition(timeline);
    if (movement > timelineWidth) {
      //return this.mouseUp();
      return console.log('exceded limit there boy')
    }
    if (movement >= 0 && movement <= timelineWidth) {
      return document.getElementById('playerbar--progressbar-handle').style.transform = `translateX(${movement}px)`;
    }
    if (movement < 0) {
      return document.getElementById('playerbar--progressbar-handle').style.transform = `translateX(${0}px)`;
    }
  }

  moveVolume = (e) => {
    const { volumeHandle, volumeTimeline, volumeTimelineWidth, currentSong} = this.state;
    let movement = e.clientX - this.getPosition(volumeTimeline);
    if (movement > volumeTimelineWidth) {
      //return this.mouseUp();
      return console.log('exceded limit there boy')
    }
    if (movement >= 0 && movement <= volumeTimelineWidth) {
      if (movement >= 0 && movement <=4) {
        currentSong.volume = 0;
      }
      if (movement >= 7 && movement <=15) {
        currentSong.volume = 0.1;
      }
      if (movement >= 16 && movement <=25) {
        currentSong.volume = 0.2;
      }
      if (movement >= 26 && movement <=35) {
        currentSong.volume = 0.3;
      }
      if (movement >= 36 && movement <=45) {
        currentSong.volume = 0.4;
      }
      if (movement >= 46 && movement <=55) {
        currentSong.volume = 0.5;
      }
      if (movement >= 56 && movement <=65) {
        currentSong.volume = 0.6;
      }
      if (movement >= 66 && movement <=75) {
        currentSong.volume = 0.7;
      }
      if (movement >= 76 && movement <=85) {
        currentSong.volume = 0.8;
      }
      if (movement >= 86 && movement <=95) {
        currentSong.volume = 0.9;
      }
      if (movement >= 100) {
        currentSong.volume = 1.0;
      }
      console.log(movement)
      return document.getElementById('playerbar--volume-handle').style.transform = `translateX(${movement}px)`;
    }
    if (movement < 0) {
      return document.getElementById('playerbar--volume-handle').style.transform = `translateX(${0}px)`;
    }
  }

  mouseDownVolume = () => {
    const { window } = this.props;
    window.addEventListener('mousemove', this.moveVolume, false);
  }

  mouseUpVolume = () => {
    const { window } = this.props;
    window.removeEventListener('mousemove', this.moveVolume, false);
  }

  mouseDown = () => {
    if (this.state.seeking) {
      this.setState({
        seekMode: 'on'
      }, () => {
        const { window } = this.props;
        const { currentSong } = this.state;
        window.addEventListener('mousemove', this.movePlay, false);
        currentSong.removeEventListener('timeupdate', this.timeUpdate, false);
      })
    }
  }

  mouseUp = () => {
    if (this.state.seeking) {
      const { window } = this.props;
      const { currentSong } = this.state;
      if (currentSong.currentTime === currentSong.duration) {
        return currentSong.duration = 0;
      }
      window.removeEventListener('mousemove', this.movePlay, false)
      currentSong.currentTime = currentSong.duration * this.clickPercent(event);
      currentSong.addEventListener('timeupdate', this.timeUpdate, false);
      console.log('bye handle', this.state)
    }
  }

  setSeek = () => {
    if (this.state.seekMode === 'on') {
      this.setState({ seekMode: 'off' }, () => {
        this.mouseUp();
      })
    }
    if (this.state.seeking) {
      return this.setState({ seeking: false })
    }

    if (!this.state.seeking) {
      return this.setState({ seeking: true }, () => {
        //console.log('seeking')
      })
    }

    return this.setState({ seeking: false }, () => {
      //console.log('not seeking')
    })
  }

  dontMovePlay = () => {
    const { currentSong, songPlaying } = this.state;
    if (currentSong.currentTime && songPlaying) {
      currentSong.currentTime = currentSong.currentTime-2
      return console.log('hello', currentSong)
    }
  }

  setcurrentSongVolume = () => {
    const { currentSong } = this.state;
    this.setState({ currentSongVolume: currentSong.volume }, () => {
      console.log(this.state)
    })
  }

  setVolumeProgressHandle = () => {
    this.setState({ 
      volumeHandle: document.getElementById('playerbar--volume-handle'),
      volumeTimeline: document.getElementById('playerbar--volume-progress-parent')
    }, () => {
      const { volumeHandle, volumeTimeline } = this.state;
      this.setState({ 
        volumeTimelineWidth: volumeTimeline.offsetWidth - volumeHandle.offsetWidth 
      }, () => {
        const { volumeHandle, volumeTimeline, volumeTimelineWidth } = this.state;
        console.log(volumeHandle, volumeTimeline, volumeTimelineWidth)
        volumeHandle.addEventListener('mousedown', this.mouseDownVolume, false);
        volumeHandle.addEventListener('mouseup', this.mouseUpVolume, false);
        volumeTimeline.addEventListener('mousedown', this.mouseDownVolume, false);
        volumeTimeline.addEventListener('mouseup', this.mouseUpVolume, false);
      })
    })
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
        //timeline.addEventListener('mousedown', this.mouseDown, false)
        //timeline.addEventListener('mouseup', this.mouseUp, false);
        //timeline.addEventListener('mouseleave', this.removeMouseMove);
        //playerHandle.addEventListener('mousedown', this.mouseDown, false);
        //playerHandle.addEventListener('mouseup', this.mouseUp, false);
        //timeline.addEventListener('mousedown', this.setSeek, false)
        //timeline.addEventListener('mouseup', this.setSeek, false);
        playerHandle.addEventListener('click', this.dontMovePlay);
        timeline.addEventListener('mouseenter', this.setSeek, false);
        timeline.addEventListener('mouseleave', this.setSeek, false)
        window.addEventListener('mousedown', this.mouseDown, false)
        window.addEventListener('mouseup', this.mouseUp, false);
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
            currentSong.addEventListener('onvolumechange', this.setcurrentSongVolume)
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
        currentSong.addEventListener('onvolumechange', this.setcurrentSongVolume)
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
        //return <this.state.audioComponent song={artist.artist_songlink} id={artist.id}/>
        //dev code 
          if (artist.id === '1' || artist.id === '2') {
            return <this.state.audioComponent song={artist.artist_songlink} id={artist.id}/>
          }
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
            currentSong.addEventListener('onvolumechange', this.setcurrentSongVolume)
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
        artists={this.state.cloudinaryArtists}
        lazy={this.props.lazy}
        Suspense={this.props.Suspense}/>
        <PlayerBar currentSongTime={{
          duration: this.state.currentSongDuration,
          progress: this.state.currentSongProgress
        }} 
        setVolumeProgressHandle={this.setVolumeProgressHandle}
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