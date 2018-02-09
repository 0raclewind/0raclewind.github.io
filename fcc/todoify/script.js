
var id = 0;
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function addItem() {
  var input = document.querySelector('#input').value;
  var error = document.getElementById('inputError');
  var time = new Date();
  var timeStamp = months[time.getMonth()] + " " + time.getDate() + ", " + time.getHours() + ":" + time.getMinutes();

  if (input === "") {
    error.innerHTML = "Your To-Do are so empty...";
  } else {
    error.innerHTML = '';
    var ul = document.querySelector('ul');
    var li = document.createElement('li');
    var timeDiv = "<div id=timeStamp>Created: " + timeStamp + "</div>";
    var checkedSpan = '<span class="glyphicon glyphicon-check" onClick=handleCheck(this)></span>';
    var uncheckedSpan = '<span class="glyphicon glyphicon-unchecked" onClick=handleCheck(this)></span>';
    var removeSpan = '<span class="glyphicon glyphicon-remove" onClick=removeItem(this) id=' + id + '></span>';

    li.innerHTML = timeDiv + uncheckedSpan + input + removeSpan;
    $(li).prependTo('.mainList ul').hide().slideDown(400);
    id++;
    document.querySelector('#input').value = "";
  }
}

function removeItem(event) {
  var elem=document.getElementById(event.id).parentNode;
  $(elem).slideUp(400);
  setTimeout(function() {
    elem.parentNode.removeChild(elem);
  }, 400);
}

function handleCheck(event) {
  var checkName = event.className.split(" ")[1];
  var eventStyle = event.parentNode.style;
  if (checkName === "glyphicon-check") {
    event.className = "glyphicon glyphicon-unchecked";
    eventStyle.textDecoration = 'none';
    eventStyle.color = '#eee';
    eventStyle.backgroundColor = 'rgba(69, 171, 147, 0.5)';
  } else {
    event.className = "glyphicon glyphicon-check";
    eventStyle.textDecoration = 'line-through';
    eventStyle.color = '#aaa';
    eventStyle.backgroundColor = 'rgba(36, 110, 92, 0.7)';
  }
}

document.getElementById("input")
.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    addItem();
  }
});
