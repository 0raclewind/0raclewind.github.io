
var id = 0;
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Add new item
function addItem() {
  // document.querySelector('#noItems').style.display = "none";
  var input = document.querySelector('#input').value;
  var error = document.getElementById('inputError');
  var timeNow = new Date();
  // Create timestamp for item
  var timeStamp = months[timeNow.getMonth()] + " " + timeNow.getDate() + ", " + timeCheck(timeNow.getHours()) + ":" + timeCheck(timeNow.getMinutes());

  if (input === "") {
    error.innerHTML = "Your To-Do are so empty...";
  } else {
    error.innerHTML = '';
    var ul = document.querySelector('ul');
    var li = document.createElement('li');
    var timeDiv = "<div id=timeStamp>Created: " + timeStamp + "</div>";
    var uncheckedSpan = '<span class="glyphicon glyphicon-unchecked" onClick=handleCheck(this)></span>';
    var removeSpan = '<span class="glyphicon glyphicon-trash" onClick=removeItem(this) id=' + id + '></span>';
    var inputSpan = '<span id=itemText>' + input + '</span>';

    li.innerHTML = timeDiv + uncheckedSpan + inputSpan + removeSpan;
    $('#noItems').slideUp(400);
    $(li).prependTo('.mainList ul').hide().slideDown(400);
    id++;
    document.querySelector('#input').value = "";
  }
}

// Remove item from list
function removeItem(event) {
  var elem=document.getElementById(event.id).parentNode;
  $(elem).slideUp(400);
  setTimeout(function() {
    elem.parentNode.removeChild(elem);
  }, 400);
  if (document.querySelector('.mainList ul').children.length === 1) {
    $('#noItems').slideDown(400);
  }
}

// Check box handling for list item
function handleCheck(event) {
  var checkName = event.className.split(" ")[1];
  var eventStyle = event.parentNode.style;

  if (checkName === "glyphicon-check") {
    event.className = "glyphicon glyphicon-unchecked";
    event.nextSibling.style.textDecoration = 'none';
    eventStyle.color = '#eee';
    eventStyle.backgroundColor = 'rgba(69, 171, 147, 0.3)';
    eventStyle.fontStyle = 'normal';
  } else {
    event.className = "glyphicon glyphicon-check";
    event.nextSibling.style.textDecoration = 'line-through';
    eventStyle.color = '#aaa';
    eventStyle.backgroundColor = 'rgba(36, 110, 92, 0.5)';
    eventStyle.fontStyle = 'italic';
  }
}

function timeCheck(time) {
  time = time.toString()
  if (time.length === 1) {
    return "0" + time;
  }
  return time;
}

function reset() {
  document.querySelector(".mainList ul").innerHTML = '';
  document.querySelector('#noItems').style.display = "block";
}

document.getElementById("input")
.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    addItem();
  }
});
