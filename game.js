var buttonColours = [ "red","blue","green","yellow" ];
// random game pattern
var gamePattern = [ ]; 

//user clciked colour
var userClickedPattern = [ ];
var level = 0;
var started = false;

//random Chosen colurs and play sound and animation for it
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  // store the random colour in randomchosecolour 
  var randomChosenColour = buttonColours [ Math.floor( Math.random() * 4 ) ];
  //pushed the random colur into the game pattern
  gamePattern.push( randomChosenColour );
  //animation for the randomchosecolour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  console.log("game " + gamePattern)
  palySound(randomChosenColour);
  animatePress(randomChosenColour);  
}



// user chosen colours and paly sound and animation for it
$(".btn").click(function (event) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    palySound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    console.log("user " + userClickedPattern);
});

//function to play sound when the user or game chosen colours 
function palySound (name) {
    var audio = new Audio("./sounds/" + name +".mp3" );
    audio.play(); 
}

// function for animation when the user or game chosen colours
function animatePress(curretColour) {
    $("#" + curretColour).addClass("pressed");
    setTimeout (function(){
    $("#" + curretColour).removeClass("pressed");
    },100)
}

// when the keyboard event happened the game starts and call the nextsequence() 
$(document).keydown(function (){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
        
    }   
});


// to check the userchoice and game choice are eaual match together  
function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success")
     if( userClickedPattern.length === gamePattern.length ){
      setTimeout (function() {
        nextSequence()
      },1000);
     }
  
  }else{
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout (function (){
      $("body").removeClass("game-over");
    },100)
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();

  }
}

//to restart the game 
function startOver () {
  level = 0;
  gamePattern = [];
  started = false;
}



