
var id = 0;


function addItem() {
  var input = document.querySelector('#input').value;
  var error = document.getElementById('inputError');

  if (input === "") {
    error.innerHTML = "Your To-Do are so empty...";
  } else {
    error.innerHTML = '';
    var ul = document.querySelector('ul');
    var li = document.createElement('li');

    li.innerHTML = input + '<span class="glyphicon glyphicon-remove" onClick=removeItem(this) id=' + id + '></span>';
    ul.prepend(li);
    id++;
    document.querySelector('#input').value = "";
  }
}

function removeItem(event) {
  var elem=document.getElementById(event.id).parentNode;
  elem.parentNode.removeChild(elem);
}

document.getElementById("input")
.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    addItem();
  }
});
