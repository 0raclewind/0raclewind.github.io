
var input = [];
var operators = ["/", "*", "-", "+"];

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
    input = [];
    input.push(result);
    update();
  }
};


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
  } else {
    if (input.length < 16) {
      input.push(event);
      update();
    }
  }
}, false);
