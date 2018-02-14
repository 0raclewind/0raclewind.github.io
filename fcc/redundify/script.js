
var weeks = 6;

function calculate() {
  var years = parseInt(document.querySelector('#years').value);
  var months = parseInt(document.querySelector('#months').value);
  var wages = parseInt(document.querySelector('#wages').value);
  var redund;

  if (!Number.isInteger(years) || !Number.isInteger(wages)) {
    document.querySelector('.output h3').innerHTML = "<span class=error>Years and wages fields cannot be blank</span>";
    document.querySelector('.redund').innerText = '';
  } else if (years <= 2) {
    document.querySelector('.output h3').innerText = "You are not entitled for redundancy";
    document.querySelector('.redund').innerHTML = '';
  } else {
    if (Number.isInteger(months)) {
      redund = Math.round((years + months/12) * weeks * wages);
    } else {
      redund = Math.round(years * weeks * wages);
    }
    document.querySelector('.output h3').innerText = "Your redundancy might be up to";
    document.querySelector('.redund').innerHTML = redund + "<span class='glyphicon glyphicon-euro'></span>";
  }
}


function checkBox() {
  var checkBox = document.querySelector('.minusFourty span');
  var isChecked = checkBox.className.split(" ")[1].split("-")[1];

  if (isChecked === "unchecked") {
    checkBox.classList.remove("glyphicon-unchecked");
    checkBox.classList.add("glyphicon-check");
    checkBox.style = "color: #5aaa4e";
    weeks = 5.2;
  } else {
    checkBox.classList.remove("glyphicon-check");
    checkBox.classList.add("glyphicon-unchecked");
    checkBox.style = "color: #ddd";
    weeks = 6;
  }
  calculate();
}

document.getElementById('wages').addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    calculate();
  }
});
