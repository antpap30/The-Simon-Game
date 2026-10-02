//3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

//5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];
var level = 0;
var start = false ;
$(document).keypress(function(event){
  if (!start){
    if(event.key === "a"|| event.key === "A"){
      $("h1").html("level " + level);
      nextSequence();
      start = true;
    }
  }
});
$(".btn").on('click', function(){
  var userChosenColour = (this.id);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
//1. Inside game.js create a new function called nextSequence()
function nextSequence() {
  userClickedPattern = [];
  //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level += 1;
  $("h1").html("level " + level);
}

function playSound(name){
  var sound = new Audio ("sounds/" + name + ".mp3" );
  sound.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    var wsound = new Audio("sounds/wrong.mp3");
    wsound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press A to Restart");
    startOver();
  }
}
function startOver(){
  level = 0 ;
  gamePattern = [];
  start = false;
}
