const convertSeconds = (sec) => {
  let hrs = Math.floor(sec / 3600);
  let min = Math.floor((sec - (hrs * 3600)) / 60);
  let seconds = sec - (hrs * 3600) - (min * 60);
  seconds = Math.round(seconds * 100) / 100
       
  let result = (min < 10 ? min : min);
  if (seconds < 10) {
    result += ":0" + (seconds < 10 ? seconds : seconds);
  } 
  else {
    result += ":" + (seconds < 10 ? seconds : seconds);
  }
    return result;
}

const Utils = {
  convertSeconds
}

export default Utils;