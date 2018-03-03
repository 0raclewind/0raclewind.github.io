$(document).ready(function() {
  $('.strictBtn').click(strictModeSwitch);
  $('.soundBtn').click(soundSwitch);
  $('.startBtn').click(startGame);
  $('.col-xs-6').click(playerClick);
  $('.messagesCheckbox').click(toggleMessages);
  $('.winnerMsg .glyphicon-remove').click(() => {
    $('.winnerMsg').fadeOut(200);
  });
  $('.infoWindow .glyphicon-remove').click(() => {
    $('.infoWindow').fadeOut(200);
  });
  $('.infoBtn').click(() => {
    $('.infoWindow').fadeIn(200);
  });

  let game = {
    playerTurn: false,
    gameOn: false,
    strictMode: false,
    sound: true,
    steps: [],
    level: 0,
    currentStep: 0,
    responseCount: 0,
    ingameMessages: true,
    strictControl: true
  };

  // Highlighted backgrounds colors
  const highlightBg = [
    'rgb(0, 201, 2)',     // Green
    'rgb(255, 0, 0)',     // Red
    'rgb(242, 255, 0)',   // Yellow
    'rgb(0, 56, 255)'    // Blue
  ];

  // Disabled backgrounds colors
  const offBg = [
    'rgb(0, 90, 0)',  // Green
    'rgb(89, 26, 26)',  // Red
    'rgb(90, 90, 0)',   // Yellow
    'rgb(0, 30, 90)'    // Blue
  ];

  //
  // Audio section
  //
  const audioLinks = [
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  ];

  function soundSwitch() {
    if (game.sound) {
      $('.soundSlider div').animate({marginLeft: '0px'}, 200);
      game.sound = false;
    } else {
      $('.soundSlider div').animate({marginLeft: '15px'}, 200);
      game.sound = true;
    }
  }

  function playSound(id) {
    if (game.sound) {
      audioLinks[id].play();
    }
  }

  function strictModeSwitch() {
    if (game.strictControl) {
      if (game.strictMode) {
        $('.strictSlider div').animate({marginLeft: '0px'}, 200);
        game.strictMode = false;
      } else {
        $('.strictSlider div').animate({marginLeft: '15px'}, 200);
        game.strictMode = true;
      }
    } else if (game.ingameMessages) {
      $('.strictMessage').fadeIn(200).delay(2000).fadeOut(200);
    }
  }

  function showMessage(message) {
    if (game.ingameMessages) {
      if (message === "Correct") {
        $('.message')
        .css({'color': 'rgb(59, 166, 60)'})
        .text(message)
        .fadeIn(150).delay(500).fadeOut(150);
      } else if (message === "Incorrect") {
        $('.message')
        .css({"color": "rgb(176, 25, 25)"})
        .text(message)
        .fadeIn(150).fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150).delay(500).fadeOut(150);
      } else {
        $('.message')
        .css({"color": "rgb(171, 171, 171)"})
        .text(message)
        .fadeIn(150)
        .delay(500)
        .fadeOut(150)
      }
    }
  }

  function startGame() {
    if (game.gameOn) {
      $('.startBtn').text("START").css("background", "rgb(44, 111, 38)");
      game.gameOn = false;
      game.currentStep = 0;
      game.level = 0;
      game.strictControl = true;
      game.playerTurn = false;
      displayLevel();
    } else {
      game.gameOn = true;
      game.strictControl = false;
      game.playerTurn = true;
      getRandomSteps();
      console.log(game.steps);
      setTimeout(() => {
        highlight(game.steps[0]);
      }, 500);
      game.currentStep = 0;
      $('.startBtn').text("STOP").css("background", "rgb(131, 2, 2)");
    }
  }

  function getRandomSteps() {
    game.steps = [];
    for (let i = 0; i < 20; i++) {
      const randomInt = Math.floor(Math.random() * 4);
      game.steps.push(randomInt);
    }
  }

  function highlight(colorID) {
    if (game.gameOn) {
      let color = '#' + colorID;
      playSound(colorID);
      $(color)
        .animate({backgroundColor: highlightBg[colorID], borderColor: "#555"}, 300)
        .delay(500)
        .animate({backgroundColor: offBg[colorID], borderColor: "#444"}, 300, function() {
          if (game.level > game.currentStep && !game.playerTurn) {
            game.currentStep++;
            highlight(game.steps[game.currentStep]);
          } else {
            showMessage("Your turn!")
            game.playerTurn = true;
          }
        });
    }
  }

  function displayLevel() {
    let level = game.level + 1;
    level = level < 10 ? "0" + level : level;
    $('.digits').text(level);
  }

  function compareUserResponse(userInput) {
    const responseCheck = game.steps[game.responseCount].toString();
    if (userInput !== responseCheck) {
      setTimeout(() => {
        showMessage("Incorrect");
      }, 500);
      game.responseCount = 0;
      game.playerTurn = false;
      game.currentStep = 0;
      if (game.strictMode) {
        setTimeout(() => {
          startGame(); // Actually toggles to STOP game
          $('.digits')
            .fadeOut(100).fadeIn(100)
            .fadeOut(100).fadeIn(100)
            .fadeOut(100).fadeIn(100);
        }, 2000);
      } else {
        setTimeout(() => {
          highlight(game.steps[0]);
        }, 2000);
      }
    } else if (game.level === game.responseCount) {
      game.playerTurn = false;
      game.responseCount = 0;
      if (game.level === 19) {
        $('.winnerMsg').fadeIn(200);
        if (game.strictMode) {
          $('.extra').addClass('glyphicon-star');
          $('.winnerMsg p').text("You are the Simon game PRO!");
        } else {
          $('.extra').addClass('glyphicon-star-empty');
        }
        startGame();
      } else {
        game.level++;
        game.currentStep = 0;
        displayLevel();
        setTimeout(() => {
          showMessage("Correct");
        }, 500);
        setTimeout(() => {
          highlight(game.steps[0]);
        }, 2000);
      }
    } else {
      game.responseCount++;
    }
  }

  function playerClick() {
    if (game.playerTurn) {
      const id = this.id;
      playSound(id);
      $('#' + id)
      .animate({backgroundColor: highlightBg[id], borderColor: "#555"}, 200)
      .delay(200)
      .animate({backgroundColor: offBg[id], borderColor: "#444"}, 200);

      compareUserResponse(id);
    }
  }

  function setFieldColor() {
    $('.col-xs-6').map(field => {
      $('#'+field).css({backgroundColor: offBg[field]});
    });
  }

  function toggleMessages() {
    if (game.ingameMessages) {
      $('.messagesCheckbox span').removeClass('glyphicon glyphicon-check');
      $('.messagesCheckbox span').addClass('glyphicon glyphicon-unchecked');
      game.ingameMessages = false;
    } else {
      $('.messagesCheckbox span').removeClass('glyphicon glyphicon-unchecked');
      $('.messagesCheckbox span').addClass('glyphicon glyphicon-check');
      game.ingameMessages = true;
    }
  }

  // toggleMessages();
  setFieldColor();
  displayLevel();
});
