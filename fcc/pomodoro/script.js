
var breakTime = 5;
var workTime = 25;
var elapsedInterval;
var allowControls = true;

window.onload = function() {
  document.querySelector('.break .controlTime').innerText = valueCheck(breakTime);
  document.querySelector('.workTime .controlTime').innerText = valueCheck(workTime);
  document.querySelector('#mins').innerText = valueCheck(workTime);
}


function start(event) {
  if (event.className === "glyphicon glyphicon-play") {
    elapsedInterval = setInterval(timeElapsed, 1000);
    event.className = "glyphicon glyphicon-pause";
    allowControls = false;
    document.querySelector('.break').classList.add('disabled');
    document.querySelector('.workTime').classList.add('disabled');
  } else {
    clearInterval(elapsedInterval);
    event.className = "glyphicon glyphicon-play";
  }
}

function reset() {
  clearInterval(elapsedInterval);
  allowControls = true;
  document.querySelector('.break').classList.remove('disabled');
  document.querySelector('.workTime').classList.remove('disabled');
  document.querySelector('#mins').innerText = valueCheck(workTime);
  document.querySelector('#secs').innerText = '00';
  document.querySelector('#startStopBtn').className = "glyphicon glyphicon-play";
}

function addTime(event) {
  if (allowControls) {
    if (event.parentNode.parentNode.className === 'workTime') {
      workTime++;
      document.querySelector('#mins').innerText = valueCheck(workTime);
      document.querySelector('.workTime .controlTime').innerText = valueCheck(workTime)
    } else {
      breakTime++;
      document.querySelector('.break .controlTime').innerText = valueCheck(breakTime)
    }
  }
}

function reduceTime(event) {
  if (allowControls) {
    if (event.parentNode.parentNode.className === "workTime") {
      if (workTime > 1) {
        workTime--;
        document.querySelector('.workTime .controlTime').innerText = valueCheck(workTime);
        document.querySelector('#mins').innerText = valueCheck(workTime);
      }
    } else {
      if (breakTime > 0) {
        breakTime--;
        document.querySelector('.break .controlTime').innerText = valueCheck(breakTime);
      }
    }
  }
}

function timeElapsed() {
  var mins = parseInt(document.querySelector('#mins').innerText);
  var secs = parseInt(document.querySelector('#secs').innerText);
  if (secs === 0) {
    mins--;
    secs = 59;
  } else {
    secs--;
  }

  document.querySelector('#mins').innerText = valueCheck(mins);
  document.querySelector('#secs').innerText = valueCheck(secs);

  if (mins === 0 && secs === 0) {
    reset();
    alert("Go to break!");
  }
}

function valueCheck(value) {
  if (value < 10) {
    return "0" + value.toString();
  }
  return value;
}
