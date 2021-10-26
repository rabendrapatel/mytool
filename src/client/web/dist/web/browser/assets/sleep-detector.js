let lastTimeChecked = new Date().getTime();
let i = 0;

setInterval(() => {

  let now = new Date().getTime();

  if ((now - 550) > lastTimeChecked) {
    postMessage('slept');
  }

  lastTimeChecked = now;

}, 500);