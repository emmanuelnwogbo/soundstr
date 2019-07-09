import React, { Suspense, lazy, Component } from 'react';
import axios from "axios";
//import Hammer from 'hammerjs';

import '../scss/components/container.scss'

import artists from '../db';
import rainbowGenerator from '../helpers/rainbow';

const SongCard = lazy(() => import('./SongCard'));
const MobileSongCard = lazy(() => import('./MobileSongCard'));
import Board from './Board';
import Controls from './Controls'

const songPlaceHolder = <div style={{
  position: 'relative',
  gridRow: 'span 16',
  gridColumn: 'span 1',
  height: '18rem',
  width: '18rem',
  borderRadius: '.3rem 3rem .3rem .3rem',
  background: 'rgba(44, 62, 80,.7)'
}}>
</div>

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedArtists: artists,
      searchedTracks: [],
      boardData: null,
      searchTerm: 'metric',
      songPlaying: false,
      currentTrack: artists[0].id,
      playBackState: null,
      initialVisit: true,
      initiallyPlaying: false,
      tracks: [...artists],
      noArtistFound: false,
      loop: false,
      shuffle: false,
      currentTrackMobile: null,
      songPlayingMobile: false,
      Hammer: false
    }
  }

  setMobilePlayState = (trackId) => {
    if (this.state.currentTrackMobile !== null && this.state.currentTrackMobile !== trackId) {
      this.pauseMobileSong();
      return this.setState({
        currentTrackMobile: trackId
      }, () => {
        if (this.state.songPlayingMobile) {
          this.playMobileSong()
        }
      })
    }

    if (this.state.songPlayingMobile) {
      return this.setState({
        songPlayingMobile: false,
        currentTrackMobile: trackId
      }, () => this.pauseMobileSong());
    }

    return this.setState({
      songPlayingMobile: true,
      currentTrackMobile: trackId,
    }, () => this.playMobileSong());
  }

  playMobileSong = () => {
    const { currentTrackMobile } = this.state;
    Array.from(document.getElementsByTagName('audio')).forEach(audio => {
      if (audio.id !== currentTrackMobile) {
        audio.pause();
        audio.load();
      }
    });
    document.getElementById(currentTrackMobile).play();
    document.getElementById(currentTrackMobile).addEventListener('ended', () => {
      this.setState({ songPlayingMobile: false })
    })
  }

  pauseMobileSong = () => {
    const { currentTrackMobile } = this.state;
    document.getElementById(currentTrackMobile).pause();
  }

  playNextManually = () => {
    const nextSibling = document.getElementById(this.state.currentTrack).parentElement.nextElementSibling;
    
    if (nextSibling.classList.contains('controls')) {
      return;
    }

    if (nextSibling.classList.contains('songcard')) {
      console.log(nextSibling.firstElementChild);
      this.stopSong();
      this.setState({
        currentTrack: `${nextSibling.firstElementChild.id}`
      }, () => {
        if (!this.state.songPlaying) {
          return;
        }
        this.playSong();
      })
    }

    if (nextSibling.classList.contains('container__recommended__header')) {
      console.log(nextSibling.nextSibling.firstElementChild);
      this.stopSong();
      this.setState({
        currentTrack: `${nextSibling.nextSibling.firstElementChild.id}`
      }, () => {
        if (!this.state.songPlaying) {
          return;
        }
        this.playSong();
      })
    }
  }

  playNext = () => {
    const nextSibling = document.getElementById(this.state.currentTrack).parentElement.nextElementSibling;
    
    if (this.state.loop) {
      return this.playSong()
    }

    if (this.state.shuffle) {
      return this.musicShuffler()
    }

    if (nextSibling.classList.contains('controls')) {
      return;
    }

    if (nextSibling.classList.contains('songcard')) {
      console.log(nextSibling.firstElementChild);
      this.setState({
        currentTrack: `${nextSibling.firstElementChild.id}`
      }, () => {
        this.playSong();
      })
    }

    if (nextSibling.classList.contains('container__recommended__header')) {
      console.log(nextSibling.nextSibling.firstElementChild);
      this.setState({
        currentTrack: `${nextSibling.nextSibling.firstElementChild.id}`
      }, () => {
        this.playSong();
      })
    }
  }

  playPrev = () => {
    const nextSibling = document.getElementById(this.state.currentTrack).parentElement.previousElementSibling;
  
    if (nextSibling.classList.contains('songcard')) {
      console.log(nextSibling.firstElementChild);
      this.setState({
        currentTrack: `${nextSibling.firstElementChild.id}`
      }, () => {
        if (!this.state.songPlaying) {
          return;
        }
        this.playSong();
      })
    }

    if (nextSibling.classList.contains('container__recommended__header')) {
      console.log(nextSibling.previousElementSibling.firstElementChild);
      this.setState({
        currentTrack: `${nextSibling.previousElementSibling.firstElementChild.id}`
      }, () => {
        if (!this.state.songPlaying) {
          return;
        }
        this.playSong();
      })
    }
  }

  playPause = (event) => {
    if (event.target.classList.contains(`play`)) {
      if (this.state.currentTrack !== event.target.dataset.songmatch 
        && this.state.currentTrack !== null) {
        this.stopSong();
        return this.setState({
          songPlaying: true,
          currentTrack: event.target.dataset.songmatch
        }, () => {
          this.playSong()
        })
      }

      return this.setState({ 
        songPlaying: true,
        currentTrack: event.target.dataset.songmatch
      }, () => {
        this.playSong();
      })
    }

    return this.setState({ 
      songPlaying: false,
      currentTrack: event.target.dataset.songmatch
    }, () => {
      this.pauseSong();
    })
  }

  togglePauseState = () => {
    if (this.state.songPlaying) {
      return this.setState({ songPlaying: false });
    }

    return this.setState({ songPlaying: true });
  }

  spaceBarControl = (event) => {
    event.preventDefault();

    if (event.code === 'Space') {
      if (this.state.songPlaying) {
        this.togglePauseState()
        return this.pauseSong();
      }

      this.togglePauseState()
      return this.playSong();
    }
  }

  playSong = () => {
    Array.from(document.getElementsByTagName('audio')).forEach(audio => {
      if (audio.id !== this.state.currentTrack) {
        audio.load();
        audio.pause();
      }
    });
    
    window.addEventListener('keydown', this.spaceBarControl, true);

    this.setState({ 
      initiallyPlaying: true,
      songPlaying: true
    })
    document.getElementById(this.state.currentTrack).play().then(() => {
      console.log(document.getElementById(this.state.currentTrack).duration)
      console.log(document.getElementById(this.state.currentTrack).currentTime)
    })
  }

  pauseSong = () => {
    this.setState({ initiallyPlaying: false })
    document.getElementById(this.state.currentTrack).pause()
  }

  stopSong = () => {
    const { currentTrack } = this.state;
    if (document.getElementById(currentTrack) !== null) {
      document.getElementById(currentTrack).load()
      document.getElementById(currentTrack).pause();
    }
  }

  setSearchTerm = (event) => {
    if (event.key === 'Enter') {
      event.target.blur();
      const playingSearched = this.state.searchedTracks.filter(track => track.id === this.state.currentTrack);
      if (playingSearched.length !== 0) {
        this.setState({
          currentTrack: artists[0].id,
          playBackState: 'ended',
          songPlaying: false,
          initiallyPlaying: false
        })
      }
      this.setState({
        searchTerm: event.target.value,
        boardData: null,
        searchedTracks: [],
        noArtistFound: false,
        tracks: [...artists]
      }, () => {
        this.fetchArtist();
      })
    }
  }

  addEventListeners = () => {
    const audios = Array.from(document.getElementsByTagName('audio'));
    audios.forEach(audio => {
      audio.preload = "auto";
      audio.addEventListener('error', (e) => {
        console.log(e, 'there was an error playing the video')
      });
      audio.addEventListener('waiting', () => {
        this.setState({ playBackState: 'waiting' })
      });
      audio.addEventListener('playing', () => {
        this.setState({ playBackState: 'playing' })
      });
      audio.addEventListener('ended', () => {
        if (document.getElementById(this.state.currentTrack).currentTime === document.getElementById(this.state.currentTrack).duration) {
          this.setState({ 
            playBackState: 'ended',
            songPlaying: false,
            initiallyPlaying: false
          }, () => {
            this.playNext();
          })
        }
      });
    })
  }

  handleLoop = () => {
    if (this.state.loop) {
      return this.setState({ loop: false })
    }

    return this.setState({ loop: true })
  }

  toggleShuffle = () => {
    if (this.state.shuffle) {
      return this.setState({ shuffle: false })
    }

    return this.setState({ shuffle: true })
  }

  musicShuffler = () => {
    const audioArray = Array.from(document.getElementsByTagName('audio'));
    const rando = audioArray[Math.floor(Math.random()*this.state.tracks.length)]
    this.setState({
      currentTrack: rando.id
    }, () => {
      this.playSong();
    })
  }

  fetchArtist = () => {
    const { searchTerm } = this.state;
    axios.get(`https://spotify-api-wrapper.appspot.com/artist/${searchTerm}`)
    .then(res => {
      if (res.data.artists.items.length > 0) {
        return this.setState({
          boardData: res.data.artists.items[0]
        }, () => {
          const { boardData } = this.state;
          axios.get( `https://spotify-api-wrapper.appspot.com/artist/${boardData.id}/top-tracks`)
            .then(res => {
              if (res.data.tracks) {
                this.setState({
                  searchedTracks: res.data.tracks,
                  tracks: [...res.data.tracks, ...artists],
                }, () => {
                  const { addEventListeners } = this;
                  addEventListeners();
                })
              }
            }).catch(err => {
              console.log(err)
            })
        })
      }
    }).catch(err => {
      console.log(err, 'failed')
      this.fetchArtist()
    })
  }

  rendersearchedTracks = () => {
    const { searchedTracks, noArtistFound } = this.state;
    if (searchedTracks.length === 0 && !noArtistFound) {
      return (
        <div className={`container__loading`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )
    }
    return searchedTracks.map(track => {
      return (
        <Suspense key={track.id} fallback={songPlaceHolder}>
          <SongCard 
          key={track.id} 
          track={track}
          overlay={rainbowGenerator(
            Math.round(Math.random() * 100), 
            Math.round(Math.random() * 80)
          )}
          playPause={this.playPause}
          songPlaying={this.state.songPlaying}
          currentTrack={this.state.currentTrack}
          playBackState={this.state.playBackState}
          />
        </Suspense>
      )
    })
  }

  renderRecommendedSongs = () => {
    const { recommendedArtists } = this.state;
    return recommendedArtists.map(artist => {
      return (
        <Suspense key={artist.id} fallback={songPlaceHolder}>
          <SongCard 
          key={artist.id} 
          artist={artist}
          overlay={rainbowGenerator(
            Math.round(Math.random() * 100), 
            Math.round(Math.random() * 80)
          )}
          playPause={this.playPause}
          songPlaying={this.state.songPlaying}
          currentTrack={this.state.currentTrack}
          playBackState={this.state.playBackState}
          />
        </Suspense>
      )
    })
  }

  renderBoard = () => {
    if (this.state.boardData !== null) {
      return <Board 
      overlay={rainbowGenerator(
        Math.round(Math.random() * 100), 
        Math.round(Math.random() * 80)
      )} 
      artistDetails={this.state.boardData}/>
    }
  }

  renderNotFound = () => {
    const { noArtistFound } = this.state;
    if (noArtistFound) {
      return <div style={{
        gridColumn: `1 / -1`,
        gridRow: `span 5`,
        textAlign: `center`,
        color: `#fff`,
        fontWeight: `900`,
        fontSize: `2.5rem`
      }}><div>Couldn't Find any artist named {this.state.searchTerm}...</div>
      <div>Try a different search?</div>
      </div>
    }

    return;
  }

  renderMobileSearchedSongs = () => {
    const { searchedTracks, noArtistFound } = this.state;
    let tracker = 0;
    if (searchedTracks.length === 0 && !noArtistFound) {
      return (
        <div className={`container__loading`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )
    }

    return searchedTracks.map(track => {
      tracker+=1;
      return (
        <Suspense key={track.id} fallback={songPlaceHolder}>
          <MobileSongCard 
          slide-tracker={tracker}
          setMobilePlayState={this.setMobilePlayState}
          songPlayingMobile={this.state.songPlayingMobile}
          currentTrackMobile={this.state.currentTrackMobile}
          key={track.id} 
          track={track}
          overlay={rainbowGenerator(
            Math.round(Math.random() * 100), 
            Math.round(Math.random() * 80)
          )}/>
        </Suspense>
      )
    })
  }

  componentDidMount() {
    this.fetchArtist();
    if (window.matchMedia('(max-width: 600px)').matches) {
      import('hammerjs').then(result => {
        this.setState({ Hammer: result.default }, () => {
          const { Hammer } = this.state;

          if (Hammer) {
            const slider = document.getElementById('mobile-slider');
            const manager = new Hammer.Manager(slider);
            const Swipe = new Hammer.Swipe();
            let totalLeftSwipes = 0;
            //let totalRightSwipes = 0;
            let translateX = '';
            manager.add(Swipe);
            manager.on('swipeleft', event => {
              //console.log(event);
              //console.log(slider.children.length, (slider.children.length - 1) * 100)
              //console.log('swiped left');
              
              if (totalLeftSwipes === slider.children.length - 1) {
                return;
              }

              totalLeftSwipes+=1;
              translateX = `${totalLeftSwipes}00`;
              console.log(totalLeftSwipes, 'after swiping left')
              if (totalLeftSwipes <= slider.children.length - 1) {
                if (this.state.currentTrackMobile !== null) {
                  if (document.getElementById(this.state.currentTrackMobile).parentElement.nextElementSibling !== null) {
                    const nextSong = document.getElementById(this.state.currentTrackMobile).parentElement.nextElementSibling.firstElementChild;
                    if (nextSong !== null) {
                      this.setMobilePlayState(nextSong.id);
                    }
                  }
                }
                Array.from(document.getElementsByClassName('mobilesongcard')).forEach(item => {
                  item.style.transform = `translateX(-${translateX}%)`;
                });
              }
            })
            manager.on('swiperight', event => {  
              if (totalLeftSwipes === 0) {
                return;
              }   

              totalLeftSwipes-=1;
              translateX = `${totalLeftSwipes}00`;
              console.log(totalLeftSwipes, 'after swiping right');
              if (totalLeftSwipes === 0) {
                if (this.state.currentTrackMobile !== null) {
                  if (document.getElementById(this.state.currentTrackMobile).parentElement.previousElementSibling !== null) {
                    const prevSong = document.getElementById(this.state.currentTrackMobile).parentElement.previousElementSibling.firstElementChild;
                    if (prevSong !== null) {
                      this.setMobilePlayState(prevSong.id);
                    }
                  }
                }
                Array.from(document.getElementsByClassName('mobilesongcard')).forEach(item => {
                  item.style.transform = `translateX(0)`;
                });
              }
              
              if (this.state.currentTrackMobile !== null) {
                if (document.getElementById(this.state.currentTrackMobile).parentElement.previousElementSibling !== null) {
                  const prevSong = document.getElementById(this.state.currentTrackMobile).parentElement.previousElementSibling.firstElementChild;
                  if (prevSong !== null) {
                    this.setMobilePlayState(prevSong.id);
                  }
                }
              }
              if (totalLeftSwipes !== 0) {
                Array.from(document.getElementsByClassName('mobilesongcard')).forEach(item => {
                  item.style.transform = `translateX(-${translateX}%)`;
                });
              }
            })
          }
        })
      })
    }
  }

  render() {
    const { 
      playSong, 
      pauseSong, 
      playNext,
      playPrev, 
      togglePauseState,
      handleLoop,
      toggleShuffle,
      playNextManually
    } = this;
    const { 
      songPlaying,
      currentTrack, 
      tracks,
      loop,
      shuffle
     } = this.state;

    if (window.matchMedia('(max-width: 600px)').matches) {
      return (
        <div className={'container__mobile'} id={'mobile-slider'}>
          {this.renderMobileSearchedSongs()}
        </div>
      )
    }
    return (
      <div className={`container`}>
        <div className={`container__header`}>
          <div className={`container__header__name`}>
            <p>Sungr</p>
          </div>
          <div className={`container__header__inputfield`}>
            <input 
            className={`container__header__inputfield--input`} 
            placeholder={`Find an Artist`}
            onKeyDown={this.setSearchTerm}
            onFocus={() => window.removeEventListener('keydown', this.spaceBarControl, true)}/>
          </div>
      </div>
      {this.renderNotFound()}
      {this.renderBoard()}
      {this.rendersearchedTracks()}
      <div className={`container__recommended__header`}>
        <h1 className="container__recommended__header--h1">Recommended</h1>
        <p className="container__recommended__header--para">for you</p>
      </div>
      {this.renderRecommendedSongs()}
      <Controls 
      playSong={playSong}
      pauseSong={pauseSong}
      playNext={playNext}
      playPrev={playPrev}
      togglePauseState={togglePauseState}
      songPlaying={songPlaying}
      tracks={tracks}
      currentTrack={currentTrack}
      loop={loop}
      handleLoop={handleLoop}
      shuffle={shuffle}
      toggleShuffle={toggleShuffle}
      playNextManually={playNextManually}/>
    </div>
    )
  }
}

export default Container;