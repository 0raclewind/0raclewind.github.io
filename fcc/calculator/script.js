
var input = [];
var operators = ["/", "*", "-", "+", "."];
var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

//Check if inputs has any value
function update() {
  if (input.length > 0) {
    document.getElementById('output').innerHTML = input.join("");
  } else {
    document.getElementById('output').innerHTML = "0";
  }
}

//Calculate final result
function getResult() {
  if (input.length > 0) {
    var result = eval(input.join(""));
    result = result.toString().slice(0,16);
    result = Number(result);
    input = [];
    input.push(result);
    update();
  }
};

// Click event listener for buttons
var btn = document.querySelector(".buttons");
btn.addEventListener("click", function(e) {
  var event = e.target.id;
  e.preventDefault();
  if (event === "deleteAll") {
    input = [];
    update();
  } else if(event === "deleteOne") {
    input.pop();
    update();
  } else if(event === "equal") {
    getResult();
  } else if (operators.includes(input[input.length - 1]) || input.length === 0) {
    if (input.length < 16 && digits.includes(event)) {
      input.push(event);
      update();
    } else {
      return false;
    }
  } else {
    if (input.length < 16) {
      input.push(event);
      update();
    }
  }
}, false);
