var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];


//DETECT THE FIRST KEYBOARD PRESS BY THE USER TO START THE GAME

var started = false;
var level = 0;

$(document).keydown(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//DETECT THE BUTTON PRESSED BY THE USER


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});



//CHECKING THE ANSWER GIVEN BY THE USER AGAINST THE ONE EXPECTED


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    }

}


// GENERATE A RANDOM NO. B/W 0-3, PUSH IT IN GAMEPATTERN ARRAY,
// FLASH THE RANDOM NUMBER BUTTON AND FINALLY PLAY THE SOUND


function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);



  playSound(randomChosenColour);
}




// PLAYSOUND FUNCTION TO PLAY SOUNDS WHEN A BUTTON IS CLICKED BY THE USER


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


// ANIMATE THE BUTTON PRESSED BY ADDING THE CLASS 'PRESSED' AND REMOVE IT AFTER 1 SEC


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}


//START-OVER FUNCTION TO RESTART THE GAME ONCE THE USER GIVES WRONG gamePattern

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
