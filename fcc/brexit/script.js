var countDownDate = new Date("Mar 29, 2019 23:00:00").getTime();

var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("days").innerHTML = days + " " + checkDays(days);
  document.getElementById("time").innerHTML = checkTime(hours) + ":"
  + checkTime(minutes) + ":" + checkTime(seconds);

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

function checkTime(time) {
	if (time < 10) {
    	return "0" + time.toString();
    } else {
    	return time
	}
};

function checkDays(days) {
	var daysStr = days.toString();
    if (daysStr[1] == "1") {
    	return "day";
    } else {
    	return "days";
    }
};
