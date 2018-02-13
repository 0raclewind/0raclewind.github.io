


function calculate() {
  var years = parseInt(document.querySelector('#years').value);
  var months = parseInt(document.querySelector('#months').value);
  var wages = parseInt(document.querySelector('#wages').value);
  var redund;

  if (!Number.isInteger(months) || !Number.isInteger(years) || !Number.isInteger(wages)) {
    document.querySelector('.output h3').innerHTML = "<span class=error>Please fill in all fields</span>";
    document.querySelector('.redund').innerText = '';
  } else if (years <= 2) {
    document.querySelector('.output h3').innerText = "You are not entitled for redundancy";
    document.querySelector('.redund').innerHTML = '';
  } else {
    redund = (years + months/12) * 6 * wages;
    document.querySelector('.output h3').innerText = "Your redundancy might be up to";
    document.querySelector('.redund').innerHTML = redund + "<span class='glyphicon glyphicon-euro'></span>";
  }
}

console.log(document.getElementsByClassName('input'));
document.getElementsByClassName('input').addEventListener("keyup", function(event) {
  console.log(event.keyCode);
  event.preventDefault();
  if (event.keyCode === 13) {
    calculate();
  }
});
