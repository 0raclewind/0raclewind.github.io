let game = {
  gameOn: false,
  player1: '',
  player2: '',
  p1Score: 0,
  p2Score: 0,
  p1Name: 'PLAYER 1',
  p2Name: 'Jennie',
  currentPlayer: "",
  emptyFields: 9,
  singlePlayer: true
};

const circle = '<i class="fa fa-circle-o fa-5x"></i>';
const cross = '<i class="fa fa-times fa-5x"></i>';

// Resets game and lets you play again
function reset() {
  $('.field').html("").css("background-color", "#ccc");
  $('.field').removeClass("winnerComb");
  $('.winnerMsg').fadeOut(500);
  game.emptyFields = 9;
  game.gameOn = true;
  if (game.singlePlayer) {
    $('.player1').addClass('playerActive');
    $('.player2').removeClass('playerActive');
  } else {
    swapPlayers();
  }
}

// Displays draw
function displayDraw() {
  $('.winner').css("padding-top", "10px");
  $('.winner p').html(" ");
  $('.winner span').html("DRAW");
  $('.winnerMsg').fadeIn(500);
}

// Displays message with winner name
function displayWinner() {
  $('.winner').css("padding-top", "0");
  $('.winner p').html("has won the game");
  if ($('.player1').hasClass("playerActive")) {
    $('.winner span').html(game.p1Name);
  } else {
    $('.winner span').html(game.p2Name);
  }
  $('.winnerMsg').fadeIn(500);
}

//Highlights winning fields
function highlightWinning(fields) {
  fields.map(field => {
    field.addClass("winnerComb", 1000);
    field.css("background", "rgb(251, 168, 108)");
  });
}

function checkWin() {
  // All fields
  const field1 = $('.field1').html();
  const field2 = $('.field2').html();
  const field3 = $('.field3').html();
  const field4 = $('.field4').html();
  const field5 = $('.field5').html();
  const field6 = $('.field6').html();
  const field7 = $('.field7').html();
  const field8 = $('.field8').html();
  const field9 = $('.field9').html();

  // Win combinations and empty field check
  const row1 = field1 === field2 && field2 === field3 && field1 != "" && field2 != "" && field3 != "";
  const row2 = field4 === field5 && field5 === field6 && field4 != "" && field5 != "" && field6 != "";
  const row3 = field7 === field8 && field8 === field9 && field7 != "" && field8 != "" && field9 != "";
  const col1 = field1 === field4 && field4 === field7 && field1 != "" && field4 != "" && field7 != "";
  const col2 = field2 === field5 && field5 === field8 && field2 != "" && field5 != "" && field8 != "";
  const col3 = field3 === field6 && field6 === field9 && field3 != "" && field6 != "" && field9 != "";
  const diag1 = field1 === field5 && field5 === field9 && field1 != "" && field5 != "" && field9 != "";
  const diag2 = field3 === field5 && field5 === field7 && field3 != "" && field5 != "" && field7 != "";

  if (row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2) {
    if (row1) {
      highlightWinning([$('.field1'), $('.field2'), $('.field3')]);
    } else if (row2) {
      highlightWinning([$('.field4'), $('.field5'), $('.field6')]);
    } else if (row3) {
      highlightWinning([$('.field7'), $('.field8'), $('.field9')]);
    } else if (col1) {
      highlightWinning([$('.field1'), $('.field4'), $('.field7')]);
    } else if (col2) {
      highlightWinning([$('.field2'), $('.field5'), $('.field8')]);
    } else if (col3) {
      highlightWinning([$('.field3'), $('.field6'), $('.field9')]);
    } else if (diag1) {
      highlightWinning([$('.field1'), $('.field5'), $('.field9')]);
    } else if (diag2) {
      highlightWinning([$('.field3'), $('.field5'), $('.field7')]);
    }
    setTimeout(displayWinner,1500);
    game.gameOn = false;
  } else if (game.emptyFields === 0) {
    displayDraw();
  } else {
    if (!game.singlePlayer) {
      swapPlayers();
    }
  }
}

function display(item, field) {
  if (item === "x") {
    $(field).html(cross);
  } else {
    $(field).html(circle);
  }
  $(field).css("background", "rgb(254, 208, 175)");
  game.emptyFields -= 1;
}

function jennie() {
  let emptyFields = [];
  game.currentPlayer = game.player2;

  $.makeArray($('.field')).map(field => {
    const id = field.classList[1];
    if (field.innerHTML === "") {
      if (id === "field1") {
        emptyFields.unshift(field);
      } else if (id === "field3") {
        emptyFields.unshift(field);
      } else if (id === "field5") {
        emptyFields.unshift(field);
      } else {
        emptyFields.push(field);
      }
    }
  });

  display(game.currentPlayer, emptyFields[0]);

  // console.log(emptyFields);

  checkWin();
  if (game.gameOn) {
    switchPlayerHighlight();
  }
  game.currentPlayer = game.player1;
}

function switchPlayerHighlight() {
  const players = $.makeArray($('.players div'));
  players.map(function(player) {
    if ($(player).hasClass("playerActive")) {
      $(player).removeClass("playerActive");
    } else {
      $(player).addClass("playerActive");
    }
  });
}

function swapPlayers() {
  if (game.currentPlayer === game.player1) {
    game.currentPlayer = game.player2;
  } else {
    game.currentPlayer = game.player1;
  }

  switchPlayerHighlight();
}

function chooseAvatar() {
  if ($(this).hasClass("fa-times")) {
    game.player1 = 'x';
    game.player2 = 'o';
  } else {
    game.player1 = 'o';
    game.player2 = 'x';
  }
  game.gameOn = true;
  game.currentPlayer = game.player1;
  $('.choiceMsg').fadeOut(300);
  $('.playground').delay(300).fadeIn(300);
}

function placeAvatar() {
  if (game.gameOn) {
    const field = "." + this.classList[1];
    if (this.innerHTML === "") {
      display(game.currentPlayer, field);
      checkWin();
      if (game.singlePlayer && game.gameOn) {
        switchPlayerHighlight();
        setTimeout(jennie, 500);
      }
    }
  }
}

// Settings
function toggleSettings() {
  $('.settings').toggle(300);
}

function saveSettings() {
  game.p1Name = $('#p1').val();
  game.p2Name = $('#p2').val();

  $('.player1').html(game.p1Name);
  $('.player2').html(game.p2Name);
  toggleSettings();
  $('.player1').addClass('playerActive');
  $('.player2').removeClass('playerActive');
  game.currentPlayer = game.player1;
  $('.field').html("").css("background-color", "#ccc");
  $('.field').removeClass("winnerComb");
  $('.winnerMsg').fadeOut(500);
  game.gameOn = true;
  game.emptyFields = 9;
}

function changeMode(event) {
  if (event.target.id === "singlePlayer") {
    game.singlePlayer = true;
    $('#singlePlayer').addClass('activeMode');
    $('#multiPlayer').removeClass('activeMode');
    $('#p2').val("Jennie");
    $('#p2').attr('disabled', 'true').addClass('p2nameDisabled');
    $('#p2nameTitle').addClass('p2nameDisabled');
  } else {
    game.singlePlayer = false;
    $('#multiPlayer').addClass('activeMode');
    $('#singlePlayer').removeClass('activeMode');
    $('#p2').val("PLAYER 2");
    $('#p2').removeAttr('disabled').removeClass('p2nameDisabled');
    $('#p2nameTitle').removeClass('p2nameDisabled');
  }
}

$(document).ready(function() {
  // clicks listeners
  $('.choiceMsg').fadeIn(300);
  $('.field').click(placeAvatar);
  $('.player1').html(game.p1Name);
  $('.player2').html(game.p2Name);
  $('.choiceMsg i').click(chooseAvatar);
  $('.settingsCog').click(toggleSettings);
  $('#save').click(saveSettings);
  $('#cancel').click(toggleSettings);
  $('.repeat').click(reset);
  $('.mode').click(changeMode);
});
